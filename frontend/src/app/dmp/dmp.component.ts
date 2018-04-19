import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AdministrativeDataService} from "../service/administrative-data.service";
import {Resources} from "../model/resources";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdministrativeData} from "../model/administrative-data";
import {AuthService} from "../service/auth.service";
import {MetadataService} from "../service/metadata.service";


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
  preservationDuration = [5, 10, 20, 50];

  tagMap = new Map<string, Resources[]>();

  resourceForm: FormGroup;

  constructor(
    private authService: AuthService,
    private administrativeDataService: AdministrativeDataService,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private metadataService: MetadataService
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
    })


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
    const form = this.resourceForm.value;
    let res: Resources = {
      resourceType: '',
      license: '',
      errorMsg: '',
      tag: form.resourceTag,
    };

    let taggedResources = this.tagMap.get(res.tag);
    if (taggedResources === undefined) {
      taggedResources = [];
    }

    taggedResources.push(res);
    this.tagMap.set(res.tag, taggedResources);
    this.metadataService.fetchMetadata(res, form.resourceLink);
    this.resourceForm.reset();

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

}
