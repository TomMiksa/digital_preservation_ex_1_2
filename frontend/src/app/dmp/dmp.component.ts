import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AdministrativeDataService} from "../service/administrative-data.service";
import {Resources} from "../model/resources";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdministrativeData} from "../model/administrative-data";
import {AuthService} from "../service/auth.service";
import {MetadataService} from "../service/metadata.service";
import {FormControlMetadata, Item} from "../model/meta";
import {ReadableDmpService} from "../service/readable-dmp.service";


@Component({
  selector: 'app-dmp',
  templateUrl: './dmp.component.html',
  styleUrls: ['./dmp.component.css']
})
export class DmpComponent implements OnInit {


  name: string;
  orcid: string;
  administrativeData: AdministrativeData;

  tags = [
    'input data', 'software', 'publication', 'output', 'documentation',
    'presentation', 'intermediate data', 'poster', 'dataset', 'image',
    'video/audio', 'lesson', 'other'
  ];

  error = '';
  preservationDurationMap = new Map<string, number>()

  tagMap = new Map<string, Resources[]>();

  preservationDurationForm: FormGroup;

  resourceForm: FormGroup;
  tagArray: FormArray;
  controlMetadata: Array<FormControlMetadata> = [];
  existingControlTags = [];

  private durations = [
    new Item('5', 5),
    new Item('10', 10),
    new Item('20', 20),
    new Item('50', 50),
  ];

  constructor(
    private readableDmpService: ReadableDmpService,
    private authService: AuthService,
    private administrativeDataService: AdministrativeDataService,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private metadataService: MetadataService,
    private formBuilder: FormBuilder,
  ) {
    this.matIconRegistry.addSvgIcon(
      "iD",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/iD_icon.svg")
    );


  }

  ngOnInit() {
    let orcidToken = this.authService.getPrincipal();
    let orcid = orcidToken.orcid;
    this.name = orcidToken.name;

    this.administrativeDataService.getAdministrativeData(orcid).subscribe(
      administrativeData => {
        this.handleSuccessFullAdministrativeDataResponse(administrativeData)
      },
      err => {
        this.handleFailedAdministrativeDataResponse(err);
      },
      () => {
        this.handleFinishedAdministrativeDataResponse();
      }
    );

    this.resourceForm = new FormGroup({
      resourceLink: new FormControl('', Validators.required),
      resourceTag: new FormControl('', Validators.required)
    });


    this.preservationDurationForm = this.formBuilder.group({
      tagArray: this.formBuilder.array([])
    });

  }

  handleSuccessFullAdministrativeDataResponse(administrativeData: AdministrativeData) {
    console.log("Successfully retrieved administrative data.");
    this.administrativeData = administrativeData;
  }

  handleFailedAdministrativeDataResponse(errorResponse: HttpErrorResponse) {
    console.error(errorResponse);
  }

  handleFinishedAdministrativeDataResponse() {
    console.log("Successfully retrieved administrative data.")
  }

  logout() {
    this.authService.clearAccessToken();
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.addResource();
  }

  addResource() {
    this.error = '';
    const form = this.resourceForm.value;
    const doi = form.resourceLink
    this.metadataService.checkDoi(doi).subscribe(
      data => this.handleDoiExists(doi),
      err => this.error = 'Error while searching for your given DOI - make sure it is from Zenodo'
    );

  }

  removeResource(resource) {
    const taggedResources = this.tagMap.get(resource.tag);
    const index = taggedResources.indexOf(resource);
    const newResource = [
      ...taggedResources.slice(0, index),
      ...taggedResources.slice(index + 1)
    ];

    if (newResource.length !== 0) {
      this.tagMap.set(resource.tag, newResource)
    } else {
      this.tagMap.delete(resource.tag);
      this.removeControl(resource.tag);
    }
  }

  generate() {
    const form = this.preservationDurationForm;
    const tagArray = form.value.tagArray;
    for (let element of tagArray) {
      for (let key in element) {
        this.preservationDurationMap.set(key, element[key]);
      }
    }

    this.readableDmpService.saveDmp(
      this.administrativeData,
      this.tagMap,
      this.preservationDurationMap);
    this.router.navigate(["/gen"]);
  }

  getTagMapKeys() {
    return Array.from(this.tagMap.keys());
  }

  private refreshPreservationDurationForm(tag) {

    this.tagArray = this.preservationDurationForm.get('tagArray') as FormArray;
    const control = new FormControlMetadata(tag, this.durations);
    const group = this.formBuilder.group({});
    let associateControl = this.formBuilder.control('', Validators.required);
    group.addControl(tag, associateControl);

    if (!this.existingControlTags.includes(tag)) {
      this.controlMetadata.push(control);
      this.tagArray.push(group);
      this.existingControlTags.push(tag);
    }
  }

  private removeControl(tag) {
    this.tagArray = this.preservationDurationForm.get('tagArray') as FormArray;
    const index = this.existingControlTags.indexOf(tag);
    this.existingControlTags.splice(index, 1);
    this.tagArray.removeAt(index);
    this.controlMetadata.splice(index, 1)
  }

  private handleDoiExists(doi) {
    const form = this.resourceForm.value;
    const tag = form.resourceTag;
    // this.preservationDurationMap.set(tag, 0);
    let res: Resources = {
      resourceType: '',
      license: '',
      errorMsg: '',
      tag: tag,
    };

    let taggedResources = this.tagMap.get(tag);
    if (taggedResources === undefined) {
      taggedResources = [];
    }

    this.metadataService.fetchMetadata(doi).subscribe(
      data => {
        this.metadataService.parseDOIData(res, data)
        taggedResources.push(res);
        this.tagMap.set(tag, taggedResources);
        this.refreshPreservationDurationForm(tag);
        this.resourceForm.reset();
      }
    );
  }
}
