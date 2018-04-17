import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import {AuthService} from "./service/auth.service";
import { AuthComponent } from './auth/auth.component';
import {AuthGuard} from "./guard/auth.guard";
import { DmpComponent } from './dmp/dmp.component';
import {AdministrativeDataService} from "./service/administrative-data.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    DmpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService, AdministrativeDataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
