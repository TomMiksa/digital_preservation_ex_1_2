import { Injectable } from '@angular/core';
import {AdministrativeData} from '../model/administrative-data';
import {Resources} from '../model/resources';

@Injectable()
export class ReadableDmpService {

  administrativeData: AdministrativeData;
  tagMap: Map<string, Resources[]>;
  preservationDurationMap: Map<string, number>;

  constructor() { }

  saveDmp(
    administrativeData: AdministrativeData,
    tagMap: Map<string, Resources[]>,
    preservationDurationMap: Map<string, number>
    ) {
    this.administrativeData = administrativeData;
    this.tagMap = tagMap;
    this.preservationDurationMap = preservationDurationMap;
  }

  isDefined(){
    if(
      this.administrativeData === undefined ||
      this.tagMap === undefined ||
      this.preservationDurationMap === undefined
    ){
      return false;
    }
    return true;
  }

}
