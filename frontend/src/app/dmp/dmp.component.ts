import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material";
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dmp',
  templateUrl: './dmp.component.html',
  styleUrls: ['./dmp.component.css']
})
export class DmpComponent implements OnInit {

  name: string;
  orcid: string;

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

    var url = new String("http://localhost:8080/record/")
    .concat(this.orcid);

    this.http.get<any>(url).subscribe(
      orcidRecord => {
        console.log(orcidRecord);
      },
      err => {
        console.error(err);
      },
      () => console.log('Done loading orcid record.')
    );
  }

  logout() {
    this.authService.logout();
  }

}
