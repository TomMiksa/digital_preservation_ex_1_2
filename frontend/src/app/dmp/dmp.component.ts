import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material";
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {AdministrativeData} from "../model/administrativeData";
import {Router} from "@angular/router";
import {AdministrativeDataService} from "../service/administrative-data.service";
import {GitHubLanguageEntry, GitHubLicense, GitHubResponse, GitHubUser} from "../model/githubresponse";
import {DOIResource, GitHubResource, Resources} from "../model/resources";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-dmp',
  templateUrl: './dmp.component.html',
  styleUrls: ['./dmp.component.css']
})
export class DmpComponent implements OnInit {

  name: string;
  orcid: string;
  administrativeData: AdministrativeData;
  name: string;

  resourceLink: string;
  resourceTag: string;
  tags = ['input', 'software', 'data'];
  preservationDuration = [5, 10, 20, 50];
  resourceType: string;

  resourceTypes = ['GitHub', 'DOI'];
  resources: Resources[] = [];
  tagMap = new Map<string, Resources[]>();

  resourceForm: FormGroup;

  constructor(
    private authService: AuthService,
    private administrativeDataService: AdministrativeDataService,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){
    this.matIconRegistry.addSvgIcon(
      "iD",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/iD_icon.svg")
    );
  }

  ngOnInit() {
    let orcidToken = this.authService.getPrincipal();
    let orcid = orcidToken.orcid;
    this.name = orcidToken.name;

    this.administrativeDataService.getAdministrativeData(orcid).subscribe(
      administrativeData => {
        this.handleSuccessFullAdministrativeDataResponse(administrativeData)
      },
      err => {
        this.handleFailedAdministrativeDataResponse(err);
      },
      () => {
        this.handleFinishedAdministrativeDataResponse();
      }
    );

    this.resourceForm = new FormGroup({
      resType: new FormControl('', Validators.required),
      resourceLink: new FormControl('', Validators.required),
      resourceTag: new FormControl('', Validators.required)
    })


  }

  handleSuccessFullAdministrativeDataResponse(administrativeData: AdministrativeData) {
    console.log("Successfully retrieved administrative data.");
    this.administrativeData = administrativeData;
  }

  handleFailedAdministrativeDataResponse(errorResponse: HttpErrorResponse) {
    console.error(errorResponse);
  }

  handleFinishedAdministrativeDataResponse() {
    console.log("Successfully retrieved administrative data.")
  }

  logout() {
    this.authService.clearAccessToken();
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.addResource();
  }

  addResource() {
    let res: Resources = {
      resourceType: this.resourceType,
      license: '',
      errorMsg: '',
      tag: this.resourceTag,
    };

    let taggedResources = this.tagMap.get(res.tag);
    if (taggedResources === undefined) {
      taggedResources = [];
    }


    taggedResources.push(res);

    this.tagMap.set(res.tag, taggedResources);

    if (this.resourceType === 'GitHub') {
      this.fetchGitHub(res);
    } else {
      this.fetchDOIMetadata(res);
    }

    // this.resources.push(res);
    // this.resources.sort((a, b) => a.tag.localeCompare(b.tag))

  }

  removeResource(index: number) {
    this.resources = [
      ...this.resources.slice(0, index),
      ...this.resources.slice(index + 1)
    ];
  }


  fetchDOIMetadata(resource: DOIResource) {

    const doi = this.resourceLink.trim();
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

  private parseDOIData(resource: DOIResource, data: string) {
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

    console.log(jsonObj);

    const metadata = jsonObj['OAI-PMH']['GetRecord']['record']['metadata']['oai_dc:dc'];
    resource.creators = metadata['dc:creator'];
    resource.date = metadata['dc:date'];
    resource.title = metadata['dc:title'];
    resource.description = metadata['dc:description'];
    resource.zenodo_identifier = metadata['dc:identifier'][0];
    resource.license = metadata['dc:rights'][1]
    /*
     * TODO rights can be only one long if github repo
     * link from zenodo to github is in dc:relation
     * check that then parse github with better rights info as well
     */

  }

  fetchGitHub(resource: GitHubResource) {
    const repoName = this.resourceLink.trim()
    resource.repoName = repoName
    this.http.get<GitHubResponse>('https://api.github.com/repos/' + repoName).subscribe(
      data => this.extractGitHubData(resource, data),
      err => this.displayError(resource)
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
