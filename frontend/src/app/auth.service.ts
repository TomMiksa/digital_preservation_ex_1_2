import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthService {

  constructor( private http:HttpClient ) {}

  authorize() {
    console.log("Open ORCID for authentication and authorization");

    var url = new String(environment.orcid.authDomain)
    .concat("?client_id=" + environment.orcid.clientId)
    .concat("&response_type=code&scope=/authenticate")
    .concat("&redirect_uri=" + environment.orcid.redirectUri);

    var oauthWindow = window.open(url, "_self");
  }

}
