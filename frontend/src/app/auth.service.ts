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

  getToken() {

    var url = new String(environment.orcid.tokenDomain)
    .concat("?client_id=" + environment.orcid.clientId)
    .concat("?client_secret=" + environment.orcid.clientSecret)
    .concat("&grant_type=authorization_code")
    .concat("&code=8EDy3s")
    .concat("&redirect_uri=" + environment.orcid.redirectUri);

    // Test call
    var headers = new HttpHeaders({ 'Authorization': 'Bearer df2e6da5-7513-49f2-9cf5-e894978ababb' });
    return this.http.get('https://pub.orcid.org/v2.1/0000-0002-9612-9022/record',  {headers, responseType: 'text'})

    //return this.http.post(url, httpOptions.headers); Richtiger Call für das Access Token

  }

}
