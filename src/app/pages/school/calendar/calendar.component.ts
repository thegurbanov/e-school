import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {CalendarService} from './calendar.service';
import {LessonHourService} from '../../dashboard/lesson-hour/lesson-hour.service';
import {EmployeesService} from '../../hr/employees/employees.service';
import {ToastrService} from 'ngx-toastr';
import {BaseResponse} from 'src/app/model/base.dto';
import {Plan, Student, Subject, Week, Yearly} from 'src/app/model/school/class.dto';
import {SubjectsService} from '../subjects/subjects.service';
import {ClassesService} from '../classes/classes.service';
import {EducationService} from '../education-year/education.service';
import {BranchRoomService} from '../../dashboard/branch-room/branch-room.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {PlansService} from '../plans/plans.service';
import {ActivatedRoute, Params} from '@angular/router';
import {StudentsService} from '../students/students.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

/***
 * Calendar Component
 */
export class CalendarComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  calendarEvents!: any[];
  editEvent: any;
  formEditData!: FormGroup;
  newEventDate: any;
  category!: any[];
  submitted = false;

  // event form
  formData!: FormGroup;
  @ViewChild('editmodalShow') editmodalShow!: TemplateRef<any>;
  @ViewChild('modalShow') modalShow !: TemplateRef<any>;

  dayOfWeeks: any = [
    {
      dayOfWeek: 1,
      name: "1. gün",
      isCurrent: true
    },
    {
      dayOfWeek: 2,
      name: "2. gün",
      isCurrent: true

    },
    {
      dayOfWeek: 3,
      name: "3. gün",
      isCurrent: true

    },
    {
      dayOfWeek: 4,
      name: "4. gün",
      isCurrent: true

    },
    {
      dayOfWeek: 5,
      name: "5. gün",
      isCurrent: true

    },
    {
      dayOfWeek: 6,
      name: "6. gün",
      isCurrent: false

    },
    {
      dayOfWeek: 7,
      name: "7. gün",
      isCurrent: false
    },

  ]

  navs: any = [
    {
      title: "Dərs",
      status: false,
      id: 1
    },
    {
      title: "Əlavə et",
      status: true,
      id: 2
    }
  ]

  group: number = 1;
  groups = [1, 2, 3]
  selectedNav = this.navs[1]
  UserAccess = this.userService.getRole();
  today: any = (new Date()).toISOString().substring(0, 10)

  LessonForm!: FormGroup
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private CalendarService: CalendarService,
    private ClassesService: ClassesService,
    private SubjectService: SubjectsService,
    private BranchRoomService: BranchRoomService,
    private PlanService: PlansService,
    private EmployeesService: EmployeesService,
    private LessonHourService: LessonHourService,
    private toastr: ToastrService,
    private StudentService: StudentsService,
    private userService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private YearService: EducationService) {
  }

  ngOnInit(): void {

    this.getYears()
    this.LessonForm = this.formBuilder.group({
      classYearly: [null, Validators.required],
      dayOfWeek: [null, Validators.required],
      lessonOfDay: [null],
      subject: [null, Validators.required],
      week: [null, Validators.required],
      teacher: [null, Validators.required],
      qrup: [1, Validators.required],
      lessonHour: [null, Validators.required],
      id: [null],
      branchRoom: [null, Validators.required]
    })
  }


  changeTab(nav: any) {
    this.navs.filter((x: any) => {
      x.status = false;
      if (x.id == nav.id) {
        x.status = true;
        this.selectedNav = x
      }
    })
  }

  teacher: any = [];
  teachers: any = []
  async getTeachersBySubjectId(subject: any) {
    await this.EmployeesService.getEmployeesBySubject(subject.id)
      .toPromise()
      .then((response: BaseResponse<EmployeesService>) => {
        if (response) {
          this.teachers = response.result;
          this.teachers.filter((x: any) => {
            x.fullName = x.secondName + " " + x.firstName
          })
        }
      })
  }

  subject: any = [];
  subjects: any = [];
  async getSubjects() {
    let response;
    if (response = (await this.SubjectService.getSubjectsByClass(this._class.id).toPromise())) {
      this.subjects = response.result;
    }
  }

  room: any = [];
  rooms: any = [];
  async getRooms() {
    let response;
    if (response = (await this.BranchRoomService.getBranchrooms('').toPromise())) {
      this.rooms = response.result;
    }
  }

  year: any = [];
  years: any = [];
  async getYears() {
    await this.YearService.getYears('').toPromise().then((response: BaseResponse<Yearly>) => {
      if (response?.code == 200) {
        this.years = response.result;
        this.year = this.years.find((x: any) => x.isCurrent == true) ?? this.years[0];
      }
    }).then(() => {
      this.getClassesByYear();
      this.getWeeks(this.year);
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
    }).catch((err: any) => {
      this.toastr.error(err)
    })

  }

  list: any = [];
  day: any = [];
  days: any = [];
  async getLessonOfCurrentDay(classID?: string) {
    var data = {
      class: classID ? classID : this._class?.id,
      week: this.week.id
    }

    if (this._class?.id && this.week?.id) {
      await this.CalendarService.getLessonOfCurrentDay(data).toPromise().then((response: BaseResponse<any>) => {

        if (response?.code == 200) {
          this.list = response.result.list;
          this.days = response.result.days;
        }

      }).then(() => {
        this.getSubjects();
        this.getRooms();
        this.getPlansByClassId()
      })
    }

  }

  async addNewSubjectAndTeacherToLesson() {
    this.LessonForm.patchValue({
      classYearly: this._class,
      dayOfWeek: this.selectedLessonDay.dayOfWeek,
      lessonOfDay: null,
      week: this.week,
      qrup: 1,
      lessonHour: this.currentHour,
    })

    await this.CalendarService.addNewSubjectAndTeacherToLesson(this.LessonForm.value).toPromise()
      .then((response: BaseResponse<any>) => {
        if (response) {
          if (response?.code == 200) {
            this.getLessonOfCurrentDay();
          }
          else {
            this.toastr.error(response.message)
          }
          this.modalService.dismissAll();
        }
      })

    this.subject = [];
    this.teacher = [];
  }

  async editCurrentLesson() {
    this.LessonForm.patchValue({
      classYearly: this._class,
      lessonOfDay: null,
      week: this.week,
      id: this.selectedMainSubject.id,
    })
    await this.CalendarService.editLesson(this.LessonForm.value).toPromise()
      .then((response: BaseResponse<any>) => {
        if (response) {
          if (response?.code == 200) {
            this.getLessonOfCurrentDay();
            this.toastr.success(response.message)
          }
          else {
            this.toastr.error(response.message)
          }
          this.modalService.dismissAll();
        }
      })

    this.selectedTeacher = [];
    this.selectedSubject = [];
  }

  selectedTeacher: any = [];
  selectedSubject: any = [];
  selectedLessonHour: any = [];
  selectedLessonDay: any = [];

  delLesson(scheduler: any) {
    Swal.fire({
      title: 'Silmək isdədiyinizə əminsiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Bəli, Sil'
    }).then(result => {
      if (result.value) {
        this.CalendarService.delLesson(scheduler.id).toPromise()
          .then(response => {
            if (response) {
              this.getLessonOfCurrentDay();
              this.toastr.success("Dərs cədvəldən silindi")
            }
          })
      }
    });
  }

  delSubject(subject: any) {
    Swal.fire({
      title: 'Silmək isdədiyinizə əminsiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Bəli, Sil'
    }).then(result => {
      if (result.value) {
        this.CalendarService.delSubject(subject.id).toPromise()
          .then(response => {
            if (response) {
              this.getLessonOfCurrentDay();
              this.modalService.dismissAll();
              this.toastr.success("Dərs cədvəldən silindi")
            }
          })
      }
    });
  }

  _class: any = []
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
        this._class = this.classes[0];
      }
    }).then(() => {
      this.getPlansByClassId();
      this.activatedRoute.params.subscribe((params: Params) => {
        if (params.classID) {
          this.getLessonOfCurrentDay(params.classID);
          this._class = this.classes.find((x: any) => x.id == params.classID)
        } else {
          this.getLessonOfCurrentDay(params.classID);
        }
      });
    })
  }

  changeClass() {
    this.getLessonOfCurrentDay();
  }
  changeWeek(week: any) {
    this.getLessonOfCurrentDay()
  }
  filters() {
    this.getClassesByYear();
    this.getWeeks(this.year)
  }

  currentDay: any = [];
  currentHour: any = [];
  currentScheduler: any = [];
  selectedMainSubject: any = []
  openModal(content: any, scheduler: any, selectedSubject?: any) {
    this.LessonForm.reset();
    this.selectedMainSubject = selectedSubject
    this.selectedLessonDay = this.days.find((x: any) => x.dayOfWeek == scheduler.dayOfWeek) ?? "";
    console.log(this.selectedLessonDay)
    this.LessonForm.controls["dayOfWeek"].patchValue(this.selectedLessonDay.dayOfWeek)
    this.currentHour = scheduler.lessonHour;
    this.currentScheduler = scheduler;

    if (selectedSubject?.teacher) {
      this.selectedTeacher = selectedSubject.teacher;
      this.LessonForm.controls["teacher"].patchValue(selectedSubject?.teacher)

    }
    if (scheduler?.lessonHour) {
      this.selectedLessonHour = scheduler.lessonHour;
      this.LessonForm.controls["lessonHour"].patchValue(scheduler?.lessonHour)

    }
    if (selectedSubject?.subject) {
      this.LessonForm.controls["subject"].patchValue(selectedSubject?.subject)
      this.selectedSubject = selectedSubject.subject;
      this.getTeachersBySubjectId(this.selectedSubject);
      this.getLessonHours();
    };
    if (selectedSubject?.branchRoom) {
      this.LessonForm.controls["branchRoom"].patchValue(selectedSubject?.branchRoom)
    }
    if (selectedSubject?.qrup) {
      this.LessonForm.controls["qrup"].patchValue(selectedSubject?.qrup)
    }
    this.modalService.open(content);
  }


  openSplitModal(content: any) {
    this.students = [];
    this.modalService.open(content, { scrollable: true, size: "xl" });

  }

  lessonHours: any = []
  async getLessonHours() {
    await this.LessonHourService.getLessonsByYear(this.year.id).toPromise()
      .then((response: BaseResponse<any>) => {
        if (response) {
          if (response?.code == 200) {
            this.lessonHours = response.result
          }
        }
      })
  }

  plans: any = [];
  async getPlansByClassId() {
    console.log(this.week)
    await this.PlanService.getPlanByClassIdAndWeekId(this._class?.id, this.week.id).toPromise().then((response: BaseResponse<Plan>) => {
      if (response?.code == 200) {
        this.plans = response.result
        console.log(this.plans)
      }
    })

  }


  students: any = [];
  allStudents: any = [];

  selectedStudents: any = [];
  async getStudentsBySubjectandClassId(subject: Subject) {
    this.subject = subject
    var data = {
      classID: this._class.id,
      subjectID: subject.id
    }
    await this.StudentService.getStudentsByClassIdandSubjectId(data).toPromise().then((response: BaseResponse<Student>) => {
      if (response?.code == 200) {
        this.allStudents = response.result;
        this.students = this.allStudents.filter((x: any) => x.qrup != this.group)
        this.selectedStudents = this.allStudents.filter((x: any) => x.qrup == this.group)
      }
    })
  }

  selectGroup(group: number) {
    this.group = group
    this.selectedStudents = this.allStudents.filter((x: any) => x.qrup == group);
    this.students = this.allStudents.filter((x: any) => x.qrup != group);
  }

  async moveStudent(student: Student) {

    var data = {
      classYearly: this._class,
      student: student,
      qrup: this.group,
      subject: this.subject
    }

    await this.StudentService.moveStudentToGroup(data).toPromise().then((response: BaseResponse<Student>) => {
      if (response?.code == 200) {
        this.allStudents = response.result;
        this.students = this.allStudents.filter((x: any) => x.qrup !== this.group)
        this.selectedStudents = this.allStudents.filter((x: any) => x.qrup === this.group)
      }
    })
  }

  async deleteStudentFromGroup(id: string) {
    await this.StudentService.deleteStudentFromGroup(id).toPromise().then((response: BaseResponse<Student>) => {
      if (response?.code == 200) {
        this.allStudents = response.result;
        this.students = this.allStudents.filter((x: any) => x.qrup !== this.group)
        this.selectedStudents = this.allStudents.filter((x: any) => x.qrup === this.group)
      }
    })
  }


  resetForm() {
    this.students = [];
    this.selectedStudents = []
    this.modalService.dismissAll();
  }

  openSubstituteModal(modalContent: any) {
    this.modalService.open(modalContent, {size: "lg"});
  }
}
