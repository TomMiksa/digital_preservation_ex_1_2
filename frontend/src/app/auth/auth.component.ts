import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  code: string;

  constructor(private authService: AuthService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
    });
  }

  ngOnInit() {
    this.authService.handleAuthCallback(this.code);
  }

}
