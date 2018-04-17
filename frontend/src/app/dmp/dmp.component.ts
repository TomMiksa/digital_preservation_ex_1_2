import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material";
import {AuthService} from "../service/auth.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AdministrativeData} from "../model/administrativeData";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dmp',
  templateUrl: './dmp.component.html',
  styleUrls: ['./dmp.component.css']
})
export class DmpComponent implements OnInit {

  administrativeData: AdministrativeData;
  name: string;

  constructor(
    private authService: AuthService,
    private administrativeDataService: AdministrativeDataService,
    private http: HttpClient,
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
  }

  handleSuccessFullAdministrativeDataResponse(administrativeData: AdministrativeData) {
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

}
