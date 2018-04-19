import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GitHubLanguageEntry, GitHubLicense, GitHubResponse, GitHubUser} from "../model/githubresponse";
import {GitHubResource, Resources} from "../model/resources";

@Injectable()
export class MetadataService {

  constructor(private http: HttpClient) {
  }


  public fetchMetadata(resource, doi) {
    const url = 'http://localhost:8080/zenodo/'.concat(doi);

    const headers = new HttpHeaders()
      .set('Content-Type', 'text/xml')
      .append('Access-Control-Allow-Origin', '*');

    this.http.get(url, {
      headers: headers,
      responseType: 'text'
    }).subscribe(
      data => this.parseDOIData(resource, data)
    )
  }

  fetchGitHub(resource,) {
    this.http.get<GitHubResponse>('https://api.github.com/repos/' + resource.repoName).subscribe(
      data => this.extractGitHubData(resource, data),
      err => this.displayError(resource)
    )
  }

  private parseDOIData(resource, data: string) {

    const fastXmlParser = require('fast-xml-parser');
    const options = {
      attributeNamePrefix: "@_",
      attrNodeName: "attr", //default is 'false'
      textNodeName: "#text",
      ignoreAttributes: true,
      ignoreNameSpace: false,
      allowBooleanAttributes: false,
      parseNodeValue: true,
      parseAttributeValue: false,
      trimValues: true,
      cdataTagName: "__cdata", //default is 'false'
      cdataPositionChar: "\\c"
    };

    const tObj = fastXmlParser.getTraversalObj(data, options);
    const jsonObj = fastXmlParser.convertToJson(tObj, options);

    const metadata = jsonObj['OAI-PMH']['GetRecord']['record']['metadata']['oai_dc:dc'];
    const relations = metadata['dc:relation'];
    const firstRelation = relations[0];

    if (firstRelation.indexOf("github") !== -1) {
      const startRepoName = firstRelation.indexOf('github.com/') + 11;
      const endRepoName = firstRelation.indexOf('/tree');
      const repoName = firstRelation.substring(startRepoName, endRepoName);
      resource.resourceType = 'GitHub';
      resource.repoName = repoName;
      this.fetchGitHub(resource);
    } else {
      resource.resourceType = 'DOI';
      resource.license = metadata['dc:rights'][1]
      resource.creators = metadata['dc:creator'];
      resource.date = metadata['dc:date'];
      resource.title = metadata['dc:title'];
      resource.description = metadata['dc:description'];
      resource.zenodo_identifier = metadata['dc:identifier'][0];
    }
  }

  private extractGitHubData(resource: GitHubResource, data: GitHubResponse) {
    this.removeError(resource);
    if (data.license !== null) {
      resource.license = data.license.name;
      this.getLicense(resource, data);
    }

    resource.owner = data.owner;
    resource.size = data.size;

    this.getLanguages(resource, data);
    this.getContributors(resource, data);
  }

  private getContributors(resource: GitHubResource, data: GitHubResponse) {
    this.http.get<GitHubUser[]>(data.contributors_url).subscribe(
      data => resource.contributors = data
    );
  }

  private getLicense(resource: GitHubResource, data: GitHubResponse) {
    this.http.get<GitHubLicense>(data.license.url).subscribe(
      data => resource.licence_url = data.html_url
    );
  }

  private getLanguages(resource: GitHubResource, data: GitHubResponse) {
    this.http.get(data.languages_url).subscribe(
      data => this.extractLanguages(resource, data)
    );
  }

  private extractLanguages(resource: GitHubResource, data) {
    const languages: GitHubLanguageEntry[] = [];
    const res_lang = [];
    for (let key in data) {
      res_lang.push({name: key, value: data[key]})

      const language: GitHubLanguageEntry = {
        name: key,
        loc: data[key]
      };
      languages.push(language);
    }
    resource.languages = languages;
    resource.language_chart = res_lang
    // console.log("language chart: " + resource.language_chart)
  }


  private displayError(resource: Resources) {
    resource.errorMsg = "there was an error";
  }

  private removeError(resource: Resources) {
    resource.errorMsg = '';
  }

}
