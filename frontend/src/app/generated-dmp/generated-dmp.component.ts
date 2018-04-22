import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-generated-dmp',
  templateUrl: './generated-dmp.component.html',
  styleUrls: ['./generated-dmp.component.css']
})
export class GeneratedDmpComponent implements OnInit {

  name: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "iD",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/iD_icon.svg")
    );
  }

  ngOnInit() {
    this.name = this.authService.getPrincipal().name;
  }

  logout() {
    this.authService.clearAccessToken();
    this.router.navigate(['/']);
  }

}
