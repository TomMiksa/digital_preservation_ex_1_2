import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {OrcidToken} from "../model/orcid-token";

@Injectable()
export class AuthService {

  constructor(private http:HttpClient) {}

  authenticate() {
    console.log("Open ORCID for authentication and authorization.");
    let url = new String(environment.orcid.authDomain)
      .concat("?client_id=" + environment.orcid.clientId)
      .concat("&response_type=code&scope=/authenticate")
      .concat("&redirect_uri=" + environment.orcid.redirectUri);
    window.open(url, "_self");
  }

  handleAuthCallback(code: string) {
    console.log("Handle login callback.");
    let url = new String("http://localhost:8080/auth")
      .concat("?code=" + code);
    return this.http.post<OrcidToken>(url, null);
  }

  isAuthenticated() {
    console.log("Checking if user is authenticated.");
    const access_token: string = localStorage.getItem("access_token");
    const name: string = localStorage.getItem("name");
    const orcid: string = localStorage.getItem("orcid");

    if(access_token == null || name == null || orcid == null){
      console.log("User is not authenticated. Missing information.");
      return false;
    }

    console.log("User is authenticated.");
    return true;
  }

  getPrincipal(){
    console.log("Fetching the currently authenticated subject.")
    if(!this.isAuthenticated()){
      return null;
    }

    const access_token: string = localStorage.getItem("access_token");
    const name: string = localStorage.getItem("name");
    const orcid: string = localStorage.getItem("orcid");
    const orcidToken: OrcidToken = new OrcidToken(access_token, name, orcid);

    return orcidToken;
  }

  setAccessToken(orcidToken: OrcidToken) {
    console.log("Saving access token in local storage.");
    localStorage.setItem("access_token", orcidToken.access_token);
    localStorage.setItem("name", orcidToken.name);
    localStorage.setItem("orcid", orcidToken.orcid);
  }

  clearAccessToken() {
    console.log("Removing access token from local storage.");
    localStorage.removeItem("access_token");
    localStorage.removeItem("name");
    localStorage.removeItem("orcid");
  }

}
