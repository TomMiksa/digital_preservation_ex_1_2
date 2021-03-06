import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GitHubLanguageEntry, GitHubLicense, GitHubResponse, GitHubUser} from '../model/githubresponse';
import {DOIResource, GitHubResource, Resources} from '../model/resources';

@Injectable()
export class MetadataService {

  private baseUrl = 'http://localhost:8080/zenodo/';
  private headers = new HttpHeaders()
  .set('Content-Type', 'text/xml')
  .append('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {
  }

  public checkDoi(doi) {
    const url = this.baseUrl.concat(doi);
    return this.http.get(url, {headers: this.headers, responseType: 'text'});
  }

  public fetchMetadata(doi) {
    const url = this.baseUrl.concat(doi);
    return this.http.get(url, {headers: this.headers, responseType: 'text'});
  }

  public parseDOIData(resource, data: string) {
    const fastXmlParser = require('fast-xml-parser');
    const options = {
      attributeNamePrefix: '@_',
      attrNodeName: 'attr', //default is 'false'
      textNodeName: '#text',
      ignoreAttributes: true,
      ignoreNameSpace: false,
      allowBooleanAttributes: false,
      parseNodeValue: true,
      parseAttributeValue: false,
      trimValues: true,
      cdataTagName: '__cdata', //default is 'false'
      cdataPositionChar: '\\c'
    };

    const tObj = fastXmlParser.getTraversalObj(data, options);
    const jsonObj = fastXmlParser.convertToJson(tObj, options);
    const metadata = jsonObj['OAI-PMH']['GetRecord']['record']['metadata']['oai_dc:dc'];
    const relations = metadata['dc:relation'];
    const firstRelation = relations[0];

    if (firstRelation.indexOf('github') !== -1) {
      const startRepoName = firstRelation.indexOf('github.com/') + 11;
      const endRepoName = firstRelation.indexOf('/tree');
      const repoName = firstRelation.substring(startRepoName, endRepoName);
      resource.resourceType = 'GitHub';
      resource.repoName = repoName;
      this.fetchGitHub(resource);
    } else {
      resource.resourceType = 'DOI';
      resource.license = metadata['dc:rights'][1]
      resource.creator = metadata['dc:creator'];
      resource.date = metadata['dc:date'];
      resource.title = metadata['dc:title'];
      resource.description = metadata['dc:description'];
      resource.zenodo_identifier = metadata['dc:identifier'][0];
    }
  }

  fetchGitHub(resource) {
    this.http.get<GitHubResponse>('https://api.github.com/repos/' + resource.repoName).subscribe(
      data => this.extractGitHubData(resource, data)
    )
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
    for (let key in data) {
      const language: GitHubLanguageEntry = {
        name: key,
        loc: data[key]
      };
      languages.push(language);
    }
    resource.languages = languages;
  }


  private displayError(resource: Resources) {
    resource.errorMsg = 'there was an error';
  }

  private removeError(resource: Resources) {
    resource.errorMsg = '';
  }

}
