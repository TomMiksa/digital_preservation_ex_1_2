import { Component, OnInit } from '@angular/core';
import {AdministrativeData} from "../model/administrative-data";
import {Resources} from "../model/resources";

@Component({
  selector: 'app-readable-dmp',
  templateUrl: './readable-dmp.component.html',
  styleUrls: ['./readable-dmp.component.css']
})
export class ReadableDmpComponent implements OnInit {

  date: Date;
  administrativeData: AdministrativeData;
  tags: string[];
  preservationDurationMap: Map<string, number>;
  tagMap: Map<string, Resources[]>;

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
    this.tags = ['input', 'software', 'data'];
    this.preservationDurationMap = new Map<string, number>();
    this.preservationDurationMap.set(this.tags[0], 20);
    this.preservationDurationMap.set(this.tags[1], 5);
    this.preservationDurationMap.set(this.tags[2], 10);
    this.tagMap = new Map<string, Resources[]>();
  }

}
