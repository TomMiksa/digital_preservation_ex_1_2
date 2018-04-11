import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material";
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {AdministrativeData} from "../model/administrativeData";

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
  resources = [{
    resourceType: 'GitHub',
    gitHubUserName: 'soberm/digital_preservation_ex_1_2',
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
        console.log(data);
        this.administrativeData = data;
      },
      err => {
        console.error(err);
      },
      () => console.log('Done loading administrative data.')
    );
  }

  logout() {
    this.authService.logout();
  }

  addResource() {
    this.resources.push({})
  }

  fetchGitHub(resource) {

    this.http.get('https://api.github.com/repos/' + resource.gitHubUserName).subscribe(
      data => this.extractGitHubData(resource, data),
      err => this.displayError(resource)
    )
  }

  private extractGitHubData(resource, data) {
    this.removeError(resource)
    resource.license = data.license.name

  }

  private displayError(resource) {
    resource.errorMsg = "there was an error";
  }

  private removeError(resource) {
    resource.errorMsg = "";
  }



}
