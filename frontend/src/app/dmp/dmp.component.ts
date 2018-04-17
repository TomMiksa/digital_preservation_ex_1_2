import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material";
import {AuthService} from "../service/auth.service";
import {HttpClient} from "@angular/common/http";
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

    var url = new String("http://localhost:8080/administrative/")
    .concat(orcid);

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
    this.authService.clearAccessToken();
    this.router.navigate(['/']);
  }

}
