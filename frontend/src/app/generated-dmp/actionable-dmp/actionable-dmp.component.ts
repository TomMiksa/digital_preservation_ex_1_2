import {Component, OnInit} from '@angular/core';
import {DOIResource, GitHubResource, Resources} from '../../model/resources';
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
      'premis': 'http://www.loc.gov/premis/rdf/v1#',
      '@id': 'http://example.org/dmps/mydmp'
    };
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
    this.tagMap.forEach((key, value) => dataCollection.push({
      'dmp:dataCollection': value,
      'dmp:Preservation': this.preservationDurationMap.get(value).toString().concat(' years')
    }));
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
    this.dmpTheme['dmp:hasPreservation'] = {};
    const dataObjects = [];

    this.tagMap.forEach((value: Resources[], key: string) => {
      let dataObject = {};
      const resources: Resources[] = this.tagMap.get(key);
      for (let resource of resources) {

        if (resource.resourceType === 'GitHub') {
          const gitHubResource = <GitHubResource> resource;
          dataObject['type'] = 'dmp:SourceCode';
          dataObject['foaf:accountName'] = gitHubResource.repoName;
          dataObject['dmp:Repository'] = 'https://github.com/'.concat(gitHubResource.repoName);
          dataObject['dmp:hasDataVolume'] = gitHubResource.size.toString().concat(' KB (server side)');
          dataObject['dc:creator'] = {
            'foaf:name': gitHubResource.owner.login,
            'foaf:OnlineAccount': gitHubResource.owner.html_url
          };
          dataObject['dmp:hasIntelectualPropertyRights'] = {
            'dcterms:license': gitHubResource.licence_url
          };
        } else if (resource.resourceType === 'DOI') {
          const doiResource = <DOIResource> resource;
          const creators = [];
          for (let creator of doiResource.creator) {
            creators.push({
              'foaf:name': creator
            });
          }
          dataObject['dc:creator'] = creators;
          dataObject['dmp:hasMetadata'] = {
            'dcterms:description': doiResource.description
          };
          dataObject['dc:date'] = doiResource.date;
          dataObject['dmp:Repository'] = doiResource.zenodo_identifier;
          dataObject['dmp:hasIntelectualPropertyRights'] = {
            'dcterms:license': resource.license
          };
          dataObject['dcterms:title'] = doiResource.title;
        }

        dataObject['dmp:dataCollection'] = resource.tag;

        const preservation = this.preservationDurationMap.get(resource.tag).toString();
        dataObject['dmp:Preservation'] = preservation.concat(' years');
      }

      dataObjects.push({'dmp:DataObject': dataObject});


    });

    this.dmpTheme['dmp:hasPreservation']['dmp:hasDataObject'] = [];
    this.dmpTheme['dmp:hasPreservation']['dmp:hasDataObject'] = dataObjects;
  }

  private initializeDataSharing() {
    this.dmpTheme['dmp:hasDataSharing'] = {};
    this.dmpTheme['dmp:hasDataSharing']['dmp:DataSharing'] = SharedConstants.dataSharing;

    let dataObject = {};
    let licenceObjs = [];
    let licences = [];
    this.tagMap.forEach((value: Resources[], key: string) => {

      const resources: Resources[] = this.tagMap.get(key);
      for (let resource of resources) {


        dataObject = {
          'dcterms:license': resource.license
        };
        if (!licences.includes(resource.license)) {
          licences.push(resource.license);
          licenceObjs.push(dataObject)
        }
      }

    });

    this.dmpTheme['dmp:hasDataSharing']['dmp:hasIntelectualPropertyRights'] = licenceObjs;
  }


  private initializeResponsibilitiesAndResources() {
    this.dmpTheme['dmp:hasRolesAndResponsibilities'] = {};
    this.dmpTheme['dmp:hasRolesAndResponsibilities']['dmp:RolesAndReposnibilites'] = SharedConstants.responsibleManagement;
  }
}
