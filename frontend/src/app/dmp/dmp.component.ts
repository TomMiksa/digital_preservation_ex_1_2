import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material";
import {AuthService} from "../auth/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AdministrativeData} from "../model/administrativeData";
import {GitHubLanguageEntry, GitHubLicense, GitHubResponse, GitHubUser} from "../model/githubresponse";
import {DOIResource, GitHubResource, Resources} from "../model/resources";

@Component({
  selector: 'app-dmp',
  templateUrl: './dmp.component.html',
  styleUrls: ['./dmp.component.css']
})
export class DmpComponent implements OnInit {

  name: string;
  orcid: string;
  administrativeData: AdministrativeData;


  resourceTypes = ['GitHub', 'DOI'];
  resourceType: string;
  resources: Resources[] = [{
    resourceType: 'DOI',
    doiLink: '1207653'
  }];


  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "iD",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/iD_icon.svg")
    );
  }

  ngOnInit() {
    this.name = localStorage.getItem("name");
    this.orcid = localStorage.getItem("orcid");

    var url = new String("http://localhost:8080/administrative/")
      .concat(this.orcid);

    this.http.get<AdministrativeData>(url).subscribe(
      data => {
        this.administrativeData = data;
      },
      err => {
        console.error(err);
      }
    );
  }

  logout() {
    this.authService.logout();
  }

  addResource() {
    this.resources.push({})
  }

  fetchDOIMetadata(resource: DOIResource) {

    const doi = resource.doiLink.trim();
    const url = 'http://localhost:8080/zenodo/'.concat(doi);

    const headers = new HttpHeaders()
      .set('Content-Type', 'text/xml')
      .append('Access-Control-Allow-Origin', '*');

    this.http.get(url, {
      headers: headers,
      responseType: 'text'
    }).subscribe(
      data => console.log(data)
    )
  }

  fetchGitHub(resource: GitHubResource) {
    const repoName = resource.repoName.trim()
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
    for (let key in data) {
      const language: GitHubLanguageEntry = {
        name: key,
        loc: data[key]
      };
      languages.push(language);
    }
    resource.languages = languages
  }

  private displayError(resource: Resources) {
    resource.errorMsg = "there was an error";
  }

  private removeError(resource: Resources) {
    resource.errorMsg = '';
  }


}
