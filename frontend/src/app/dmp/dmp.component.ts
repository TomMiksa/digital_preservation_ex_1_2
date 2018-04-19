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


@Component({
  selector: 'app-dmp',
  templateUrl: './dmp.component.html',
  styleUrls: ['./dmp.component.css']
})
export class DmpComponent implements OnInit {


  name: string;
  orcid: string;
  administrativeData: AdministrativeData;

  tags = ['input', 'software', 'data'];

  error = '';
  preservationDurationMap = new Map<string, number>()
  tagMap = new Map<string, Resources[]>();
  preservationDurationForm: FormGroup;

  resourceForm: FormGroup;
  tagArray: FormArray;
  controlMetadata: Array<FormControlMetadata> = [];
  private durations = [
    new Item('5', 5),
    new Item('10', 10),
    new Item('20', 20),
    new Item('50', 50),
  ];

  constructor(
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
      tagArray: this.formBuilder.array([{}])
    });

    this.refreshPreservationDurationForm();
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

  private handleDoiExists(doi) {
    const form = this.resourceForm.value;
    let res: Resources = {
      resourceType: '',
      license: '',
      errorMsg: '',
      tag: form.resourceTag,
    };

    this.preservationDurationMap.set(form.resourceTag, 0);

    let taggedResources = this.tagMap.get(res.tag);
    if (taggedResources === undefined) {
      taggedResources = [];
    }

    taggedResources.push(res);

    this.tagMap.set(res.tag, taggedResources);

    this.metadataService.fetchMetadata(res, doi);
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
    }
  }

  private refreshPreservationDurationForm() {

    this.tagArray = this.preservationDurationForm.get('tagArray') as FormArray;
    this.tagArray.removeAt(0);

    for (let tag of this.tags) {
      const control = new FormControlMetadata(tag, this.durations);
      const group = this.formBuilder.group({});
      this.controlMetadata.push(control);
      let associateControl = this.formBuilder.control('', Validators.required);
      group.addControl(tag, associateControl);
      this.tagArray.push(group);
    }


  }
}
