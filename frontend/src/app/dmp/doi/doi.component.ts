import {Component, Input, OnInit} from '@angular/core';
import {DOIResource} from '../../model/resources';

@Component({
  selector: 'app-doi',
  templateUrl: './doi.component.html',
  styleUrls: ['./doi.component.css']
})
export class DoiComponent implements OnInit {


  @Input()
  resource: DOIResource;

  constructor() {
  }

  ngOnInit() {
  }

}
