import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EducationService } from '../education-year/education.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SubjectsService } from '../subjects/subjects.service';
import { EducationYear, Journal, Plan, Week, Yearly } from 'src/app/model/school/class.dto';
import { BaseResponse } from 'src/app/model/base.dto';
import { EmployeesService } from '../../hr/employees/employees.service';
import { ClassesService } from '../classes/classes.service';
import { JournaListService } from './journal-list.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Employee } from 'src/app/model/organization/employee.dto';
import { CalendarService } from '../calendar/calendar.service';
@Component({
  selector: 'app-journals',
  templateUrl: './journal-list.component.html',
  styleUrls: ['./journal-list.component.scss'],
})
export class JournalListComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  journal!: any;
  form!: FormGroup;
  data: any = [];
  constructor(
    private JournalsService: JournaListService,
    private YearService: EducationService,
    private formBuilder: FormBuilder,
    private SubjectService: SubjectsService,
    private CalendarService: CalendarService,
    private EmployeesService: EmployeesService,
    private ClassesService: ClassesService,
    private userService: AuthenticationService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      classPrefix: new FormControl('', [Validators.required]),
      weeklyHour: new FormControl([], [Validators.required]),
      tendency: new FormControl(null, [Validators.required]),
      subject: new FormControl(null, [Validators.required]),
    });
  }
  submitted = false;
  UserAccess = this.userService.getRole();

  ngOnInit(): void {
    this.getYears();
  }

  journals: any = [];
  allJournals: any = [];
  async getJournals() {

    let data = {
      yearlyId: this.year?.id,
      weekId: this.week?.id
    }

    await this.JournalsService.getJournals(data).toPromise().then((response: BaseResponse<Journal>) => {
      if (response?.code == 200) {
        this.journals = response.result;
        this.allJournals = response.result
      }
    }).then(() => {
      this.getClassesByYear();
      this.form.get('yearly')?.get('id')?.setValue(this.year.id);
      this.filter();
    })
  }

  teacher: any;
  teachers: any = [];
  async getTeachers() {

    await this.EmployeesService.getEmployees('').toPromise().then((response: BaseResponse<Employee>) => {
      if (response?.code == 200) {
        this.teachers = response.result;
      }
      else {
        this.toastr.error(response.message)
      }
    })

  }

  subjects: any = [];
  async getSubjects() {
    await this.SubjectService.getSubjects('').toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.subjects = response.result;
      }
    })
  }

  year: any = [];
  years: any = [];
  async getYears() {
    await this.YearService.getYears('').toPromise().then((response: BaseResponse<EducationYear>) => {
      if (response?.code == 200) {
        this.years = response.result
        this.year = this.years.find((year: Yearly) => year.isCurrent) ?? this.years[0]
      }
    }).then(() => {
      if (this.UserAccess == 'ROLE_ADMIN') {
        this.getTeachers();
        this.getSubjects();
      }
      this.getWeeks(this.year);

    })

  }

  selectedSubject: any;
  selectedTeacher: any;
  filter() {
    this.journals = this.allJournals;
    if (this.selectedTeacher?.id) {
      this.journals = this.journals.filter((journal: Journal) => journal.teacher?.id == this.selectedTeacher.id);
    }
    if (this._class?.id) {
      this.journals = this.journals.filter((journal: Journal) => journal.classYearly?.id == this._class.id)
    }
    if (this.selectedSubject?.id) {
      this.journals = this.journals.filter((journal: Journal) => journal.subject?.id == this.selectedSubject.id);
    }
  }

  _class: any;
  classes: any = [];
  async getClassesByYear() {
    this.classes = [];
    this._class = [];
    await this.ClassesService.getClassesByYear(this.year.id).toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.classes = response.result;
        this.classes.filter((_class: any) => {
          _class.info = + _class.classPrefix + " " + _class.classPrefixIndicator
        });
      }
    })
  }


  week: any = []
  weeks: any = [];
  async getWeeks(year: any) {
    this.week = [];
    this.weeks = [];
    await this.CalendarService.getWeeks(year.id).toPromise().then((response: BaseResponse<Week>) => {
      if (response?.code == 200) {
        this.weeks = response.result;
        this.week = this.weeks.find((x: any) => x.isActive == true) ?? this.weeks[0]
      }
    }).then(() => {
      this.getJournals();

    })

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
