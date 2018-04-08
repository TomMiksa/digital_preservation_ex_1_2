import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

interface AuthResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  name: string;
  orcid: string;
}

@Injectable()
export class AuthService {

  constructor( private http:HttpClient, private router: Router ) {}

  authorize() {
    console.log("Open ORCID for authentication and authorization.");

    var url = new String(environment.orcid.authDomain)
    .concat("?client_id=" + environment.orcid.clientId)
    .concat("&response_type=code&scope=/authenticate")
    .concat("&redirect_uri=" + environment.orcid.redirectUri);

    var oauthWindow = window.open(url, "_self");
  }

  handleAuthCallback(code: string) {
    console.log("Handle login callback.");

    var url = new String("http://localhost:8080/auth")
    .concat("?code=" + code);

    this.http.post<AuthResponse>(url, null).subscribe(
      data => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("orcid", data.orcid);
        this.router.navigate(['/dmp']);
      },
      err => console.error(err),
      () => console.log('Done loading token')
    );
  }

  isAuthenticated() {
    console.log("Checking if user is authenticated.");
    if(localStorage.getItem("access_token") == null
      || localStorage.getItem("name") == null
      || localStorage.getItem("orcid") == null){
      console.log("User is not authenticated.");
      return false;
    }
    console.log("User is authenticated.");
    return true;
  }

  logout() {
    console.log("Logout current user.");
    localStorage.removeItem("access_token");
    localStorage.removeItem("name");
    localStorage.removeItem("orcid");
    this.router.navigate(['/']);
  }

}
