import { Component, OnInit } from '@angular/core';
import {AdministrativeData} from "../model/administrative-data";

@Component({
  selector: 'app-readable-dmp',
  templateUrl: './readable-dmp.component.html',
  styleUrls: ['./readable-dmp.component.css']
})
export class ReadableDmpComponent implements OnInit {

  date: Date;
  administrativeData: AdministrativeData;

  constructor() { }

  ngOnInit() {
    this.date = new Date();
    this.administrativeData = { orcid: "https://orcid.org/0000-0002-9612-9022",
      family_name: "Sober",
      given_name: "Michael",
      email: "michael.sober@ymail.com",
      country: "AT",
      project_title: "Project X"
    };
  }

}
