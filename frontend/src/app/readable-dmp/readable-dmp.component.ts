import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-readable-dmp',
  templateUrl: './readable-dmp.component.html',
  styleUrls: ['./readable-dmp.component.css']
})
export class ReadableDmpComponent implements OnInit {

  date: Date;

  constructor() { }

  ngOnInit() {
    this.date = new Date();
  }

}
