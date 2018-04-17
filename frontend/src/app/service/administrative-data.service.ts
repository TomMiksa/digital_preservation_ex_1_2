import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AdministrativeData} from "../model/administrative-data";

@Injectable()
export class AdministrativeDataService {

  constructor(private http: HttpClient) { }

  getAdministrativeData(orcid: string) {
    console.log("Trying to get administrative data from(" + orcid + ").")
    let url = new String("http://localhost:8080/administrative/")
      .concat(orcid);
    return this.http.get<AdministrativeData>(url);
  }

}
