import { Component, OnInit } from '@angular/core';
import {AdministrativeData} from "../../model/administrative-data";
import {Resources} from "../../model/resources";
import {ReadableDmpService} from "../../service/readable-dmp.service";

@Component({
  selector: 'app-readable-dmp',
  templateUrl: './readable-dmp.component.html',
  styleUrls: ['./readable-dmp.component.css']
})
export class ReadableDmpComponent implements OnInit {

  date: Date;
  administrativeData: AdministrativeData;
  preservationDurationMap: Map<string, number>;
  tagMap: Map<string, Resources[]>;

  constructor(private readableDmpService: ReadableDmpService) { }

  ngOnInit() {
    this.date = new Date();
    this.administrativeData = this.readableDmpService.administrativeData;
    this.preservationDurationMap = this.readableDmpService.preservationDurationMap;
    this.tagMap = this.readableDmpService.tagMap;
  }

  getTagMapKeys() {
    return Array.from(this.tagMap.keys());
  }

  getPreservationDurationMapKeys() {
    return Array.from(this.preservationDurationMap.keys());
  }

}
