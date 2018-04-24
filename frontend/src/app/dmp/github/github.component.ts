import {Component, Input, OnInit} from '@angular/core';
import {GitHubResource} from '../../model/resources';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent implements OnInit {


  @Input()
  resource: GitHubResource;

  constructor() {
  }

  ngOnInit() {
  }

}
