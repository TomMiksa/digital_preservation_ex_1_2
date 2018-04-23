import {Component, OnInit} from '@angular/core';
import {Resources} from '../../model/resources';
import {AdministrativeData} from '../../model/administrative-data';
import {ReadableDmpService} from '../../service/readable-dmp.service';
import {SharedConstants} from "../../model/sharedConstants";

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
  dmpTheme = {};

  constructor(private readableDmpService: ReadableDmpService) {

  }

  ngOnInit() {
    this.date = new Date();
    this.administrativeData = this.readableDmpService.administrativeData;
    this.preservationDurationMap = this.readableDmpService.preservationDurationMap;
    this.tagMap = this.readableDmpService.tagMap;
    this.initializeDMP();
  }

  public initializeDMPStructure() {
    this.dmp['dmp:DataManagementPlan'] = {};
    this.dmpTheme = this.dmp['dmp:DataManagementPlan']['DataManagementPlanTheme'] = {};
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
  }

  private initializeDMP() {
    this.initializeContext();
    this.initializeDMPStructure();
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

  private initializeAdminData() {

    this.dmpTheme['dcterms:title'] = this.administrativeData.project_title;
    this.dmpTheme['dcterms:hasVersion'] = '1.0.0';

    const day = this.date.getDate();
    const month = this.date.getMonth() + 1;
    const year = this.date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`
    this.dmpTheme['dc:date'] = formattedDate;

    const name = this.administrativeData.family_name.concat(' ').concat(this.administrativeData.given_name)

    this.dmpTheme['dc:creator'] = {
      'foaf:name': name,
      'foaf:mbox': this.administrativeData.email,
      '@id': this.administrativeData.orcid
    }
  }

  private initializeDataCollection() {
    const dataCollection = [];
    this.tagMap.forEach((key, value) => dataCollection.push({'dmp:dataCollection': value}))
    this.dmpTheme['dmp:hasDataCollection'] = dataCollection;
  }

  private initializeDocumentation() {
    this.dmpTheme['dmp:hasDocumentation'] = {};
    this.dmpTheme['dmp:hasDocumentation']['dmp:Documentation'] = SharedConstants.documentation;
  }

  private initializeMetaData() {
    this.dmpTheme['dmp:hasMetadata'] = {};
    this.dmpTheme['dmp:hasMetadata']['dmp:Metadata'] = SharedConstants.metaData;
  }

  private initializeEthicsAndLegal() {
    this.dmpTheme['dmp:hasEthicsAndPrivacy'] = {};
    this.dmpTheme['dmp:hasEthicsAndPrivacy']['dmp:EthicsAndPrivacy'] = SharedConstants.ethicsAndLegal;
  }

  private initializeStorageAndBackup() {
    this.dmpTheme['dmp:hasStorageAndSecurity'] = {};
    this.dmpTheme['dmp:hasStorageAndSecurity']['dmp:StorageAndSecurity'] = SharedConstants.storageBackup;
  }

  private initializeSelectionAndPreservation() {

  }

  private initializeDataSharing() {
    this.dmpTheme['dmp:hasDataSharing'] = {};
    this.dmpTheme['dmp:hasDataSharing']['dmp:DataSharing'] = SharedConstants.dataSharing;
  }


  private initializeResponsibilitiesAndResources() {
    this.dmpTheme['dmp:hasRolesAndResponsibilities'] = {};
    this.dmpTheme['dmp:hasRolesAndResponsibilities']['dmp:RolesAndReposnibilites'] = SharedConstants.responsibleManagement;

  }
}
