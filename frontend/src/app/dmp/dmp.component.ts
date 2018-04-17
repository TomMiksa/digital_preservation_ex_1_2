import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material";
import {AuthService} from "../service/auth.service";
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

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){
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

}
