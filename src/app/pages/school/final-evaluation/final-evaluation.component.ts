import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClassesService} from "../classes/classes.service";
import {StudentsService} from "../students/students.service";

@Component({
  selector: 'app-final-evaluation',
  templateUrl: './final-evaluation.component.html',
  styleUrls: ['./final-evaluation.component.scss']
})
export class FinalEvaluationComponent implements OnInit {

  classId: string = ''
  studentList: any[] = []
  years: any[] = []
  currentYear!: any;

  constructor(private activatedRoute: ActivatedRoute,
              private yearlyService: ClassesService,
              private studentService: StudentsService) {
  }

  async ngOnInit(): Promise<void> {
    await this.checkRoute()

    await this.yearlyService.getYears(null).toPromise().then(response => {
      if (response?.code === "200") {
        this.years = response?.result
        console.log(this.years)
        this.currentYear = this.years.filter((x: any) => x.isCurrent)[0]
      }
    })

    await this.getStudents()
  }

  async checkRoute() {
    await this.activatedRoute.params.subscribe(params => {
      if (params['classId']) {
        this.classId = params['classId']
        console.log(this.classId)
      }
    })
  }

  async getStudents() {
    await this.studentService.getStudentsByClassId(this.classId).toPromise().then(response => {
      if (response?.code === "200") {
        this.studentList = response.result.map((x: any) => x.customer)
        console.log(this.studentList)
      }
    })
  }

}

