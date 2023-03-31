import {Component, OnInit} from '@angular/core';
import {AdditionalLessonService} from "../services/additional-lesson.service";
import {ToastrService} from "ngx-toastr";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClassesService} from "../classes/classes.service";
import {SubjectsService} from "../subjects/subjects.service";
import {LessonHourService} from "../../dashboard/lesson-hour/lesson-hour.service";
import {EmployeesService} from "../../hr/employees/employees.service";
import {EducationService} from "../education-year/education.service";
import {BranchRoomService} from "../../dashboard/branch-room/branch-room.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-additional-lesson',
  templateUrl: './additional-lesson.component.html',
  styleUrls: ['./additional-lesson.component.scss']
})
export class AdditionalLessonComponent implements OnInit {

  additionalLessonList: any[] = []
  lessonAddForm!: FormGroup
  classYearlyList: any[] = []
  subjectList: any[] = []
  lessonHourList: any [] = []
  teacherList: any[] = []
  years: any[] = []
  yearlyId!: any;
  branchRoomList: any[] = []
  selectedLesson!: any

  constructor(private additionalLessonService: AdditionalLessonService,
              private toastrService: ToastrService,
              private classYearlyService: ClassesService,
              private subjectService: SubjectsService,
              private lessonHourService: LessonHourService,
              private teacherService: EmployeesService,
              private yearlyService: EducationService,
              private branchRoomService: BranchRoomService) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getYears()
    this.getSubjects()
    this.getBranchRooms()
  }

  createForm() {
    this.lessonAddForm = new FormGroup({
      id: new FormControl({value: '', disabled: true}),
      info: new FormControl(null),
      lessonDay: new FormControl((new Date()).toISOString().substring(0, 10), [Validators.required]),
      lessonHourId: new FormControl('', [Validators.required]),
      subjectId: new FormControl('', [Validators.required]),
      teacherId: new FormControl('', [Validators.required]),
      classYearlyId: new FormControl('', [Validators.required]),
      branchRoomId: new FormControl('', [Validators.required]),
    })
  }

  getYears() {
    this.yearlyService.getYears(null).toPromise().then(response => {
      if (response?.code === "200") {
        this.years = response?.result
        this.yearlyId = this.years.filter((x: any) => x.isCurrent)[0]?.id
        this.getAdditionalListByYear()
        this.getClassYearlyList()
        this.getLessonHourListByYearId()
      }
    })
  }

  get validation(): { [key: string]: AbstractControl } {
    return this.lessonAddForm.controls;
  }

  getAdditionalListByYear() {
    this.additionalLessonService.getListByYearId(this.yearlyId).toPromise().then(response => {
      if (response?.code === "200") {
        this.additionalLessonList = response?.result
      }
    })
  }

  getClassYearlyList() {
    this.classYearlyService.getClassesByYear(this.yearlyId).toPromise().then(response => {
      if (response.code === "200") {
        this.classYearlyList = response?.result
      }
    })
  }

  getLessonHourListByYearId() {
    this.lessonHourService.getLessonHoursByYearId(this.yearlyId).toPromise().then(response => {
      if (response.code === "200") {
        this.lessonHourList = response?.result
      }
    })
  }

  resetForm() {
    //@ts-ignore
    this.selectedLesson = undefined
    this.lessonAddForm.reset()
  }

  addLesson() {
    Swal.fire({
      title: 'Daxil edilən məlumatlar daha sonra dəyişdirilməyəcək. Davam etmək istəyirsiniz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Bəli',
      cancelButtonText: 'İmtina',
    }).then((result) => {
      if (result.value) {
        const formControls = this.lessonAddForm.controls
        const body = {
          "classYearly": {id: formControls['classYearlyId'].value},
          "info": formControls['info'].value,
          "lessonDay": formControls['lessonDay'].value,
          "lessonHour": {id: formControls['lessonHourId'].value},
          "subject": {id: formControls['subjectId'].value},
          "teacher": {id: formControls['teacherId'].value},
          "branchRoom": {id: formControls['branchRoomId'].value}
        }

        this.additionalLessonService.add(body).toPromise().then(response => {
          if (response?.code === "200") {
            this.toastrService.success(response?.message)
            this.ngOnInit()
            this.resetForm()
          }
        })
      }
    })
  }

  deleteLessonById(id: string) {

    Swal.fire({
      title: 'Silmək istədiyinizə əminsiniz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Bəli',
      cancelButtonText: 'İmtina',
    }).then((result) => {
      if (result.value) {
        this.additionalLessonService.deleteById(id).toPromise().then(response => {
          if (response?.code === "200") {
            this.toastrService.success(response?.message)
            this.ngOnInit()
            this.resetForm()
          }
        })
      }
    })
  }

  changeYear() {
    this.getAdditionalListByYear()
  }

  getSubjects() {
    this.subjectService.getSubjects(null).toPromise().then(response => {
      if (response?.code === "200") {
        this.subjectList = response?.result
      }
    })
  }

  changeSubject(subjectId: string) {
    this.getTeachersBySubjectId(subjectId)
  }

  getTeachersBySubjectId(subjectId: string) {
    this.teacherService.getEmployeesBySubject(subjectId).toPromise().then(response => {
      if (response?.code === "200") {
        this.teacherList = response?.result
      }
    })
  }

  getBranchRooms() {
    this.branchRoomService.getBranchrooms(null).toPromise().then(response => {
      if (response?.code === "200") {
        this.branchRoomList = response?.result
      }
    })
  }

  getLessonById(id: string | undefined) {
    if (id) {
      this.additionalLessonService.getById(id).toPromise().then(response => {
        if (response?.code === "200") {
          this.selectedLesson = response?.result
          this.setAdditonalLessonDataToForm()
        }
      })
    }
  }

  setAdditonalLessonDataToForm() {
    this.lessonAddForm.patchValue(this.selectedLesson)
    const formControls = this.lessonAddForm.controls
    formControls['classYearlyId'].setValue(this.selectedLesson.classYearly.id)
    formControls['lessonHourId'].setValue(this.selectedLesson.lessonHour.id)
    formControls['subjectId'].setValue(this.selectedLesson.subject.id)
    this.changeSubject(this.selectedLesson.subject.id)
    formControls['teacherId'].setValue(this.selectedLesson.teacher.id)
    formControls['branchRoomId'].setValue(this.selectedLesson.branchRoom.id)
  }
}
