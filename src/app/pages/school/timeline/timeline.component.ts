import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {BaseResponse} from 'src/app/model/base.dto';
import {Date, Student, Yearly} from 'src/app/model/school/class.dto';
import {EducationService} from '../education-year/education.service';
import {TimelineService} from './timeline.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  months: any = [
    {
      id: 9,
      info: 'Sentyabr'
    },
    {
      id: 10,
      info: 'Oktyabr'
    }
    , {
      id: 11,
      info: 'Noyabr'
    },
    {
      id: 12,
      info: 'Dekabr'
    },
    {
      id: 1,
      info: 'Yanvar'
    }
    ,
    {
      id: 2,
      info: 'Fevral'
    }
    , {
      id: 3,
      info: 'Mart'
    },
    {
      id: 4,
      info: 'Aprel'
    },
    {
      id: 5,
      info: 'May'
    }
    ,
    {
      id: 6,
      info: 'İyun'
    }
  ]
  month: any = this.months[this.months.length - 1]

  constructor(private yearService: EducationService,
              private timelineService: TimelineService,
              private toastr: ToastrService,
              private userService: AuthenticationService) {
  }

  UserAccess = this.userService.getRole();

  ngOnInit(): void {

    if (this.UserAccess == 'ROLE_SCHOOL_STUDENT_PARENT') {
      this.getChildren();
    }

    this.getYears()
  }

  year: any = [];
  years: any = [];

  async getYears() {
    await this.yearService.getYears('').toPromise().then((response: BaseResponse<Yearly>) => {
      if (response?.code == 200) {
        this.years = response.result;
        this.year = this.years.find((x: any) => x.isCurrent == true) ?? this.years[0];
      }
    }).then(() => {
      this.getLessonByCustomerID();
    })
  }


  child: any = [];
  children: any = [];

  async getChildren() {
    await this.timelineService.getChildren('').toPromise().then((response: BaseResponse<Student>) => {
      if (response?.code == 200) {
        this.children = response.result;
        this.child = this.children[0]
      }
    })

  }

  dates: any = [];
  async getLessonByCustomerID() {
    let data = {
      customerId: this.child.customer?.id,
      month: this.month.id,
      yearlyId: this.year.id
    }

    await this.timelineService.getLessonByCustomerID(data).toPromise().then((response: BaseResponse<Date>) => {
      if (response?.code == 200) {
        this.dates = response.result.dates
      }
    })
  }
}
