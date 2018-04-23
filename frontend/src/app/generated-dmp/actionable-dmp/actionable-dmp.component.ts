import {Component, OnInit} from '@angular/core';
import {Resources} from '../../model/resources';
import {AdministrativeData} from '../../model/administrative-data';
import {ReadableDmpService} from '../../service/readable-dmp.service';

@Component({
  selector: 'app-actionable-dmp',
  templateUrl: './actionable-dmp.component.html',
  styleUrls: ['./actionable-dmp.component.css']
})
export class ActionableDmpComponent implements OnInit {

  date: Date;
  administrativeData: AdministrativeData;
  preservationDurationMap: Map<string, number>;
  tagMap: Map<string, Resources[]>;
  dmp = {};

  constructor(private readableDmpService: ReadableDmpService) {

  }

  ngOnInit() {
    this.date = new Date();
    this.administrativeData = this.readableDmpService.administrativeData;
    this.preservationDurationMap = this.readableDmpService.preservationDurationMap;
    this.tagMap = this.readableDmpService.tagMap;
    this.initializeDMP();
  }

  private initializeDMP() {
    this.initializeContext();
    this.initializeAdminData();
    this.initializeDataCollection();
    this.initializeDocumentation();
    this.initializeMetaData();
    this.initializeEthicsAndLegal();
    this.initializeStorageAndBackup();
    this.initializeSelectionAndPreservation();
    this.initializeDataSharing();
    this.initializeResponsibilitiesAndResources();
  }

  private initializeContext() {
    this.dmp['@context'] = {
      'dmp': 'http://purl.org/madmps#',
      'foaf': 'http://xmlns.com/foaf/0.1/',
      'dc': 'http://purl.org/dc/elements/1.1/',
      'dcterms': 'http://purl.org/dc/terms/',
      'premis': 'http://www.loc.gov/premis/rdf/v1#'
    };
    this.dmp['@id'] = 'http://example.org/dmps/mydmp';
    this.dmp['@type'] = 'dmp:DataManagementPlan';
  }

  private initializeAdminData() {

    this.dmp['dcterms:title'] = this.administrativeData.project_title;
    this.dmp['dcterms:hasVersion'] = '1.0.0';

    const day = this.date.getDate();
    const month = this.date.getMonth() + 1;
    const year = this.date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`
    this.dmp['dc:date'] = formattedDate;

    const name = this.administrativeData.family_name.concat(' ').concat(this.administrativeData.given_name)

    this.dmp['dc:creator'] = {
      'foaf:name': name,
      'foaf:mbox': this.administrativeData.email,
      '@id': this.administrativeData.orcid
    }
  }

  private initializeDataCollection() {

    const tags = [];
    this.tagMap.forEach((key, value) => tags.push({'dmp:dataCollection': value}))


    this.dmp['dmp:hasDataCollection'] = tags;
  }

  private initializeDocumentation() {
    this.dmp['dmp:hasDocumentation'] = 'fixed text'
  }

  private initializeMetaData() {

  }

  private initializeEthicsAndLegal() {

  }

  private initializeStorageAndBackup() {

  }

  private initializeSelectionAndPreservation() {

  }

  private initializeDataSharing() {

  }


  private initializeResponsibilitiesAndResources() {

  }
}
