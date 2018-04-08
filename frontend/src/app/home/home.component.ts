import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){
    this.matIconRegistry.addSvgIcon(
      "iD",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/iD_icon.svg")
    );
  }

  ngOnInit() {
  }

  openORCID() {
    console.log("Open ORCID for authentication and authorization");
    var oauthWindow = window.open("https://orcid.org/oauth/authorize?client_id=APP-XKGDV7S0FH0UDKAX&response_type=code&scope=/authenticate&redirect_uri=http://localhost:4200", "_self");
  }

}
