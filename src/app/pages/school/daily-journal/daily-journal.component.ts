import { Component, OnInit } from '@angular/core';
import { BaseResponse } from 'src/app/model/base.dto';
import { DailyJournalService } from './daily-journal.service';
import * as moment from 'moment';


@Component({
  selector: 'app-daily-journal',
  templateUrl: './daily-journal.component.html',
  styleUrls: ['./daily-journal.component.scss']
})
export class DailyJournalComponent implements OnInit {
  constructor(
    private Service: DailyJournalService
  ) { }


  date: any;
  ngOnInit(): void {
    this.getJournalDaily();
  }


  journalData: any = [];
  data: any;
  getJournalDaily(date?: any) {

    let data = {
      date: moment(this.date).format("DD.MM.yyyy")
    }

    this.Service.getJournalData(data).toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.journalData = response.result
      }
    })
  }
}
