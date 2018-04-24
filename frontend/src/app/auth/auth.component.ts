import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrcidToken} from '../model/orcid-token';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  code: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
    });
  }

  ngOnInit() {
    this.authService.handleAuthCallback(this.code).subscribe(
      orcidToken => {
        this.handleSuccessFullAuthentication(orcidToken);
      },
      err => {
        this.handleFailedAuthentication(err);
      },
      () => {
        this.handleFinishedAuthentication();
      });
  }

  handleSuccessFullAuthentication(orcidToken: OrcidToken) {
    this.authService.setAccessToken(orcidToken);
    this.router.navigate(['/dmp']);
  }

  handleFailedAuthentication(errorResponse: HttpErrorResponse) {
    console.error(errorResponse);
    this.router.navigate(['/']);
  }

  handleFinishedAuthentication() {
    console.log('Successfully logged in.')
  }

}
