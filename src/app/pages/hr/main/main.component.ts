import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  startDate: any = moment(new Date())
  endDate: any = moment(new Date())
  ngOnInit(): void {

  }

  difDay: any;
  difMonth: any;
  getDate(startDate: any, endDate: any) {

    this.difDay = moment(endDate).diff(moment(startDate), 'days');
    this.difMonth = moment(endDate).diff(moment(startDate), 'month');
  }

}
