import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {BaseResponse} from 'src/app/model/base.dto';
import {ClassYearly, ClassYearlyEducationPlan, Student, Subject, Topic, Yearly} from 'src/app/model/school/class.dto';
import {ClassesService} from '../classes/classes.service';
import {EducationService} from '../education-year/education.service';
import {SubjectsService} from '../subjects/subjects.service';
import {JournalService} from './journal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private ClassService: ClassesService,
              private YearService: EducationService,
              private SubjectService: SubjectsService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private JournalService: JournalService,
              private formBuilder: FormBuilder
  ) { }

  classID: string = '';
  subjectID: string = '';
  msubjectID: string = '';
  teacherID: string = '';
  mediaLink: any;

  numberMarks = Array(100).fill(0).map((x, i) => ({ value: (i + 1), isActive: false }));
  marks = [
    {
      value: 'Q',
      isActive: false
    },
    {
      value: 'Q/Ü',
      isActive: false
    }
    ,
    {
      value: 'I/E',
      isActive: false
    }
  ]

  navs: any = [
    {
      title: 'Ümumi',
      status: true,
      id: 1,
    },
    {
      title: 'Şagird',
      status: false,
      id: 2,
    },
  ];

  MarkForm!: FormGroup;
  topicForm!: FormGroup

  async ngOnInit(): Promise<void> {

    this.createMarkForm()
    this.createTopicForm()
    await this.checkRoute()
    await this.getYears();
  }

  createMarkForm() {
    this.MarkForm = this.formBuilder.group({
      lesson: ['', Validators.required],
      mark: ['', Validators.required],
      student: [this.selectedStudent, Validators.required],
      content: [null],
      markNote: ['']
    })
  }

  createTopicForm() {
    this.topicForm = new FormGroup({
      id: new FormControl(),
      homeTask: new FormControl(''),
      topic: new FormControl(),
      topic2: new FormControl(),
      mediaLink: new FormControl(''),
      mediaLink2: new FormControl('')
    })
  }

  async checkRoute() {
    await this.activatedRoute.params.subscribe((params: Params) => {
      if (params.classID && params.subjectID && params.teacherID && params['yearlyId']) {
        this.classID = params.classID
        this.subjectID = params.subjectID
        this.msubjectID = params.msubjectID
        this.teacherID = params.teacherID;
        this.year.id = params['yearlyId']
        this.getClassById(this.classID);
        this.getSubjectById(this.subjectID)
      }
    });
  }

  lesson: any = [];
  currentLessonId: any = [];

  async getCurrentLessonData(month: any, _class?: any) {
    if (_class) {
      this.classID = _class?.id
    }

    let data = {
      classID: this._class?.classYearly?.id,
      subjectID: this._class?.subject?.id,
      teacherID: this._class?.teacher?.id,
      monthID: month?.month
    }

    await this.JournalService.getLessonDetailFromJournalList(data).toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.lesson = response.result;
        if (response.result) {
          this.currentLessonId = response.result.currentLessonId
          this.lesson?.days?.filter((day: any, i: number) => {
            day.editable = false;
            day.index = i;
          })
          }
          this.getTopics();
          this.getPrograms();
        }
    })
  }

  currentClass!: ClassYearly;
  async getClassById(id: string) {
    await this.ClassService.getClassById(id).toPromise().then((response: any) => {
      if (response?.code == 200) {
        this.currentClass = response.result;
        this.getMonths(this.currentClass.id);
      }
    })

  }

  currentSubject!: Subject;
  async getSubjectById(id: string) {
    await this.SubjectService.getSubjectById(id).toPromise().then((response: any) => {
      if (response?.code == 200) {
        this.currentSubject = response.result
      }
    })
  }


  month: any = [];
  months: any = [];
  async getMonths(id: string) {
    await this.JournalService.getMonths(id).toPromise().then((response: any) => {
      if (response?.code == 200) {
        this.months = response.result;
        this.month = this.months.find((x: any) => x.isCurrent === 0) ?? this.months[this.months.length - 1];
      }
    }).then(() => {
      this.getClassesByYear().then(() => {
        this.getCurrentLessonData(this.month);
      })
    })
  }

  year: any = [];
  years: any = [];
  async getYears() {
    await this.YearService.getYears('').toPromise().then((response: BaseResponse<Yearly>) => {
      if (response?.code == 200) {
        this.years = response.result;
        this.year = this.years.filter((x: any) => x.id === this.year.id)[0] ?? this.years[0]
        this.getClassesByYear();
      }
      else {
        this.toastr.error(response.message)
      }
    }).catch((err: any) => {
      this.toastr.error(err)
    })
  }

  _class: any = []
  classes: any = [];
  async getClassesByYear() {
    this.classes = [];
    this._class = [];

    await this.ClassService.getAllByClassYearlyAndTeacher(this.year.id, this.teacherID).toPromise().then(response => {
      if (response?.code === "200") {
        this.classes = response.result.filter((x: any) => x.classYearly);
        response.result.filter((_class: any) => {
          _class.info = +_class.classYearly.classPrefix + " " + _class.classYearly.classPrefixIndicator + " - " + _class.subject.info
        });
        this._class = this.classes.find((x: any) => x.classYearly.id == this.classID)
      }
    }).then(()=>{
      this.getMarkContents();
    })

  }

  topics: any = [];
  async getTopics() {

    let data = {
      classID: this.classID,
      subjectID: this.subjectID
    }
    await this.JournalService.getTopics(data).toPromise().then((response: BaseResponse<Topic>) => {
      if (response?.code == 200) {
        this.topics = response.result
      }
      else {
        this.toastr.error(response.message)
      }
    })
  }

  changeMonth(month: any) {
    this.getCurrentLessonData(month)
  }

  async giveNote() {
    await this.JournalService.giveNote(this.MarkForm.value).toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.toastr.success(response?.message);
        this.getCurrentLessonData(this.month, this._class.classYearly)
      }
    })
    this.marks.filter((x: any) => x.isActive = false)
    this.MarkForm.reset();
    this.modalService.dismissAll();

  }

  programs: any = [];
  async getPrograms() {

    let data = {
      classID: this.classID,
      subjectID: this.subjectID,
      teacherID: this.teacherID,
      monthID: this.month.month
    }
    await this.JournalService.getPrograms(data).toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.programs = response.result.programs
      }
    })
  }

  selectedDay: any = [];
  openModal(content: any, day: any) {
    if (day) {
      this.selectedDay = day;
      this.topicForm.patchValue(day)
    }
    this.modalService.open(content);
  }

  editLesson(day: any, i: number) {
    day.editable = true;
  }

  Move(event: any, index: number) {
    if (event == 'UP') {
      document.getElementById(`note_${index}`)?.focus()
    }
    else if (event == 'DOWN') {

      document.getElementById(`note_${index}`)?.focus()
    }
  }

  changeClass(month: any, _class: any) {
    this.getCurrentLessonData(month, _class)
  }

  hometask!: string;
  async add2Topic() {
    this.topicForm.controls['id'].setValue(this.selectedDay.id)
    await this.JournalService.addTopic(this.topicForm.value).toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.programs = response.result?.programs;
        this.toastr.success(response.message)
      }
      this.modalService.dismissAll();
    })


  }


  async delProgram(program: any) {
    Swal.fire({
      title: 'Silmək isdədiyinizə əminsiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Bəli, Sil',
      cancelButtonText: 'İmtina',
    }).then((result) => {
      if (result.value) {
        this.JournalService.delProgram(program.id)
          .toPromise()
          .then((response: BaseResponse<ClassYearlyEducationPlan>) => {
            if (response?.code == 200) {
              this.toastr.success('Program cədvəldən silindi');
            }
          })
      }
    });
  }

  selectedStudent!: Student;
  selectedLesson!: any;
  openNoteModal(content: any, student: any, lesson: any, note?: any) {
    this.selectedLesson = lesson;
    this.selectedStudent = student;
    this.marks.filter((x: any) => {
      x.isActive = false
      if (x.value == note.mark) {
        x.isActive = true;
        if (typeof x.value === 'string') {
          this.MarkForm.controls['markNote'].disable();
          this.MarkForm.controls['content'].disable();
        } else {
          this.MarkForm.controls['markNote'].enable();
          this.MarkForm.controls['content'].enable();
        }
      }

    })
    this.MarkForm.patchValue({
      lesson: lesson,
      student: {
        id: student.studentId
      },
      markNote: note?.markNote,
      content: note?.content,
      mark: note.mark
    })

    this.modalService.open(content);
  }


  contents: any;
  async getMarkContents() {
    var data = {
      classSectionId: this.currentClass?.classSchool?.section?.id,
      subjectId: this.currentSubject?.id
    }
    await this.JournalService.getMarkContents(data).toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.contents = response.result
      }
    })
  }

  selectMark(mark: any) {
    this.marks.filter((x: any) => {
      x.isActive = false
      if (x.value == mark.value) {
        x.isActive = true;
        if (typeof x.value === 'string') {
          this.MarkForm.controls['markNote'].disable();
          this.MarkForm.controls['content'].disable();
        } else {
          this.MarkForm.controls['markNote'].enable();
          this.MarkForm.controls['content'].enable();
        }
      }

    })
  }

  setMarkAnumber() {
    this.marks.filter((x: any) => {
      x.isActive = false
    });
    this.MarkForm.controls['content'].enable();
    this.MarkForm.controls['markNote'].enable();
  }
}
