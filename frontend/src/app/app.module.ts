import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './/app-routing.module';
import {HomeComponent} from './home/home.component';
import {AuthComponent} from './auth/auth.component';
import {DmpComponent} from './dmp/dmp.component';
import {AdministrativeDataService} from "./service/administrative-data.service";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {GithubComponent} from './dmp/github/github.component';
import {DoiComponent} from './dmp/doi/doi.component';
import {AuthService} from "./service/auth.service";
import {AuthGuard} from "./guard/auth.guard";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    DmpComponent,
    GithubComponent,
    DoiComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxChartsModule
  ],
  providers: [AuthService, AdministrativeDataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
