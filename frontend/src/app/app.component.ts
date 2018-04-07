import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){
    this.matIconRegistry.addSvgIcon(
      "iD",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/iD_icon.svg")
    );
  }

  openORCID() {
    console.log("Open ORCID for authentication and authorization");
    var oauthWindow = window.open("https://orcid.org/oauth/authorize?client_id=APP-XKGDV7S0FH0UDKAX&response_type=code&scope=/authenticate&redirect_uri=http://localhost:4200", "_self");
  }

}
