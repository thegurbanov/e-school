import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {BaseResponse} from 'src/app/model/base.dto';
import {ClassSection, Subject, Teacher, Yearly} from 'src/app/model/school/class.dto';
import {studentReceptionDto} from 'src/app/model/school/studentReceptionDto';
import {ParentsService} from '../../hr/parents/parents.service';
import {SectionsService} from '../sections/sections.service';
import {StudentReceptionService} from './student-reception.service';
import {SubjectsService} from '../subjects/subjects.service';
import Swal from 'sweetalert2';
import {studentReceptionExamDto} from 'src/app/model/school/studentReceptionExamDto';
import {studentReceptionParentDto} from 'src/app/model/school/studentReceptionParentDto';
import {EmployeesService} from '../../hr/employees/employees.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";
import {GenderDto} from "../../../model/organization/gender.dto";
import {Employee} from "../../../model/organization/employee.dto";
import {EducationService} from "../education-year/education.service";
import {GenderService} from "../../dashboard/services/gender.service";

@Component({
  selector: 'app-student-reception',
  templateUrl: './student-reception.component.html',
  styleUrls: ['./student-reception.component.scss']
})
export class StudentReceptionComponent implements OnInit {
  StudentReceptionParentForm!: FormGroup;
  StudentReceptionExamForm!: FormGroup;
  StudentReceptionForm!: FormGroup;
  genders: GenderDto[] = []
  studentSearchFilter: string = '';
  employyeList: Employee[] = []
  statisticList: any[] = []
  totalStatistics: any
  years: Yearly[] = []

  statuses: any = [
    {
      id: 1,
      info: "Gözləmədə",
      color: "inherit",
      value: "IN_PROGRESS"
    },
    {
      id: 2,
      info: "Qəbul olundu",
      color: "green",
      value: "ACCEPTED"
    },
    {
      id: 3,
      info: "Qəbul edilmədi",
      color: "red",
      value: "REJECTED"
    },
    {
      id: 4,
      info: "Təxirə salındı",
      color: "orange",
      value: "POSTPONED"
    }
  ]

  contactCheckboxShower: boolean = false;
  student!: studentReceptionDto;
  submitted = false;
  examSubmitted = false;
  studentNote: any = '';
  educationYear: any;

  constructor(
    private fb: FormBuilder,
    private SectionService: SectionsService,
    private ParentService: ParentsService,
    private SubjectsService: SubjectsService,
    private EmployeeService: EmployeesService,
    private studentReceptionService: StudentReceptionService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private genderService: GenderService,
    private yearlyService: EducationService) {
  }

  async ngOnInit(): Promise<void> {
    this.createStudentReceptionExamForm()
    this.createStudentReceptionForm()
    this.createStudentReceptionParentForm()
    await this.getYears()
    this.getStudents();
    this.getGenders()
    this.getEmployees()
    this.getStats()

  }

  async getYears() {
    await this.yearlyService.getYears(null).toPromise().then(response => {
      if (response?.code === "200") {
        this.years = response?.result
        this.educationYear = this.years.find(x => x.isCurrent)
      }
    })
  }

  getEmployees() {
    this.EmployeeService.getEmployees(null).toPromise().then(response => {
      if (response?.code === "200") {
        this.employyeList = response?.result
      }
    })
  }

  getStats() {
    this.studentReceptionService.getStats().toPromise().then(response => {
      if (response?.code === "200") {
        this.statisticList = response?.result
        this.totalStatistics = {
          pending: this.statisticList.reduce((acc, stat) => acc + stat.pending, 0),
          canceled: this.statisticList.reduce((acc, stat) => acc + stat.canceled, 0),
          postpone: this.statisticList.reduce((acc, stat) => acc + stat.postpone, 0),
          accepted: this.statisticList.reduce((acc, stat) => acc + stat.accepted, 0),
          totalOfTotal: this.statisticList.reduce((acc, stat) => acc + stat.total, 0)
        }
      }
    })
  }

  getGenders() {
    this.genderService.getList().toPromise().then((response:any) => {
      if (response?.code === "200") {
        this.genders = response?.result
      }
    })
  }

  createStudentReceptionForm() {
    this.StudentReceptionForm = this.fb.group({
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.required, Validators.min(2), Validators.max(50)]),
      secondName: new FormControl('', [Validators.required, Validators.min(2), Validators.max(50)]),
      fatherName: new FormControl('', [Validators.required, Validators.min(2), Validators.max(50)]),
      gender: new FormControl('', [Validators.required]),
      statusType: new FormControl(''),
      statusReason: new FormControl(''),
      isContract: new FormControl(true),
      note: new FormControl(''),
      dob: new FormControl('', Validators.required),
      section: new FormControl(this.sections[0]),
      classPrefix: new FormControl(1),
      psychologist: new FormControl('', [Validators.required]),
      psychologistNote: new FormControl(),
      doctor: new FormControl('', [Validators.required]),
      doctorNote: new FormControl(),
      documentNo: new FormControl(),
      email: new FormControl(),
      factualAdress: new FormControl(),
      interest: new FormControl(),
      pin: new FormControl(),
      registrationAdress: new FormControl(),
      year: new FormControl('', [Validators.required])
    });
  }

  createStudentReceptionParentForm() {
    this.StudentReceptionParentForm = this.fb.group({
      id: [],
      firstName: ['', [Validators.required, Validators.min(2), Validators.max(50)],],
      secondName: ['', [Validators.required, Validators.min(2), Validators.max(50)],],
      fatherName: ['', [Validators.required, Validators.min(2), Validators.max(50)],],
      gender: [this.genders[0], Validators.required],
      mob1: [''],
      mob2: [''],
      relational: [''],
      dob: new FormControl(),
      documentNo: new FormControl(),
      pin: new FormControl(),
      email: new FormControl(),
      factualAdress: new FormControl(),
      note: new FormControl(),
      registrationAdress: new FormControl(),
      profession: new FormControl()
    });
  }

  createStudentReceptionExamForm() {
    this.StudentReceptionExamForm = this.fb.group({
      id: [],
      note: ['', Validators.required],
      test: [true, Validators.required],
      examResult: [''],
      examQuestionCount: [''],
      examAnsweredQuestionCount: [''],
      examRightQuestionCount: [''],
      subject: [this.subject, Validators.required],
      teacher: [''],
    });
  }


  get f(): { [key: string]: AbstractControl } {
    return this.StudentReceptionForm.controls;
  }

  get parentsControls(): { [key: string]: AbstractControl } {
    return this.StudentReceptionParentForm.controls;
  }

  get examControls(): { [key: string]: AbstractControl } {
    return this.StudentReceptionExamForm.controls;
  }

  selectedStudentStatus: any = []
  openModal(content: any, student: studentReceptionDto) {

    this.selectedStudentStatus = student;
    this.StudentReceptionForm.patchValue(
      student
    )
    this.modalService.open(content);
    this.StudentReceptionForm.patchValue({
      statusType: this.statuses.find((x: any) => x.value == student.statusType) ?? this.statuses[0]
    });
    this.catchStatusType(this.statuses.find((x: any) => x.value == student.statusType) ?? this.statuses[0])
  }
  findStatus(status: any) {
    let currentStatus = this.statuses.find((x: any) => x.value == status)
    return currentStatus;
  }
  changeStudentStatus(student: any) {
    let data = {
      id: student?.id,
      statusType: student?.statusType?.value,
      statusReason: student?.statusReason,
      isContract: student.isContract

    }
    this.studentReceptionService.chageStudentStatus(data).toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.toastr.success(response.message);
        this.students = response.result.list;
        this.selectedStudentStatus = [];
        this.modalService.dismissAll();

        if (this.StudentReceptionForm.controls['isContract'].value === true) {
          this.router.navigate([`accounting/create-contract/category/education/contractType/STUDENT_EDUCATION/predimet/${response.result.customer.id}`]).then(() => {
            this.StudentReceptionForm.reset();
          })
        }
      }
    })

  }


  catchStatusType(event: any) {
    if (event.value === "ACCEPTED") {
      this.contactCheckboxShower = true
    }
    else {
      this.contactCheckboxShower = false
    }
  }

  sections: ClassSection[] | any = [];
  section!: ClassSection;
  async getSections() {
    await this.SectionService.getSections('')
      .toPromise()
      .then((response: BaseResponse<ClassSection>) => {
        if (response?.code == 200) {
          this.sections = response.result;
          this.section = this.sections[0]
        }
      })

  }

  classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  students: any = [];
  async getStudents() {
    await this.studentReceptionService.getStudents(this.educationYear?.id).toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.students = response.result.list
      }
    }).then(() => {
      this.getSections();
      this.getRelations();
    })
  }

  add() {
    this.submitted = true;
    this.StudentReceptionForm.controls['statusType'].setValue( 'IN_PROGRESS')
    this.StudentReceptionForm.controls['doctor'].setValue({id:  this.StudentReceptionForm.controls['doctor'].value})
    this.StudentReceptionForm.controls['psychologist'].setValue({id:  this.StudentReceptionForm.controls['psychologist'].value})

    if(this.StudentReceptionForm.valid){
      this.studentReceptionService.add(this.StudentReceptionForm.value).toPromise().then((response: BaseResponse<any>) => {
        if (response?.code == 200) {
          this.submitted = false;
          this.toastr.success(response.message);
          this.modalService.dismissAll()
          this.StudentReceptionForm.reset()
          this.students = response?.result?.list
        }
      })
    }
  }


  relations: any = [];
  async getRelations() {
    await this.ParentService.getRelations('').toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.relations = response.result;
      }
    })
  }

  selectedStudent!: studentReceptionDto | any;
  selectStudent(student: studentReceptionDto) {
    this.selectedStudent = student;
    this.StudentReceptionForm.patchValue(student);
    this.StudentReceptionForm.controls['doctor'].setValue(this.selectedStudent?.doctor?.id)
    this.StudentReceptionForm.controls['psychologist'].setValue(this.selectedStudent?.psychologist?.id)
    this.getStudentParents(student.id);
    this.getStudentExams(student.id);
    this.getSubjects();
  }


  subjects: any = [];
  subject!: Subject;
  getSubjects() {
    this.SubjectsService.getSubjects('').toPromise().then((response: BaseResponse<Subject>) => {
      if (response?.code == 200) {
        this.subjects = response.result;
        this.subject = this.subjects[0];
        this.StudentReceptionExamForm.patchValue({
          subject: this.subjects[0]
        })
      }
    }).then(() => {
      this.getTeacherBySubjectId(this.subject)
    })
  }


  selectedParent: any;
  selectParent(parent: studentReceptionParentDto) {
    this.selectedParent = parent;
    this.StudentReceptionParentForm.patchValue(parent)
  }
  selectedExam: any;
  selectExam(exam: studentReceptionExamDto) {
    this.shower = exam.test;
    this.selectedExam = exam;
    this.StudentReceptionExamForm.patchValue(exam)
  }

  parents: any;
  async getStudentParents(studentId: string) {
    await this.studentReceptionService.getStudentParents(studentId).toPromise().then((response: BaseResponse<studentReceptionParentDto>) => {
      if (response?.code == 200) {
        this.parents = response.result;
      }
    })
  }
  exams: any;
  async getStudentExams(studentId: string) {
    await this.studentReceptionService.getStudentExams(studentId).toPromise().then((response: BaseResponse<studentReceptionExamDto>) => {
      if (response?.code == 200) {
        this.exams = response.result;
      }
    })
  }

  parentSubmitted: boolean = false;
  addParentToStudent() {
    if (this.selectedStudent?.id) {
      this.parentSubmitted = true
      this.studentReceptionService.addParentToStudent(this.StudentReceptionParentForm.value, this.selectedStudent.id).toPromise().then((response: BaseResponse<studentReceptionParentDto>) => {
        if (response?.code == 200) {
          this.toastr.success(response.message);
          this.parents = response.result;
          this.resetParentForm()
        }
      })
    } else {
      this.toastr.warning('Şagird seçin');
    }

  }

  addExamToStudent() {
    if (this.selectedStudent?.id) {
      this.examSubmitted = true
      this.studentReceptionService.addExamToStudent(this.StudentReceptionExamForm.value, this.selectedStudent.id).toPromise().then((response: BaseResponse<studentReceptionExamDto>) => {
        if (response?.code == 200) {
          this.toastr.success(response.message);
          this.exams = response.result;
          this.resetExamForm();
        }
      })
    } else {
      this.toastr.warning('Şagird seçin');
    }

  }


  del(id: string) {
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
        this.studentReceptionService.remove(id).toPromise().then((response: BaseResponse<any>) => {
          if (response?.code == 200) {
            this.students = response?.result?.list;
            this.toastr.success('Şagird cədvəldən silindi');
          }
        })


      }
    });

  }

  delParent(id: string) {
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
        this.studentReceptionService.removeParent(id).toPromise().then((response: BaseResponse<studentReceptionParentDto>) => {
          if (response?.code == 200) {
            this.parents = response.result;
            this.toastr.success('Valideyn cədvəldən silindi');
          }
        })


      }
    });
  }

  delExam(id: string) {
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
        this.studentReceptionService.removeExam(id).toPromise().then((response: BaseResponse<studentReceptionExamDto>) => {
          if (response?.code == 200) {
            this.exams = response.result;
            this.toastr.success('Sınaq cədvəldən silindi');
          }
        })


      }
    });
  }

  update() {
    this.StudentReceptionForm.controls['doctor'].setValue({id: this.StudentReceptionForm.controls['doctor'].value})
    this.StudentReceptionForm.controls['psychologist'].setValue({id: this.StudentReceptionForm.controls['psychologist'].value})
    this.StudentReceptionForm.controls['note'].setValue(this.studentNote)

    this.studentReceptionService.edit(this.StudentReceptionForm.value).toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.toastr.success(response.message);
        this.students = response.result.list;
        this.modalService.dismissAll()
      }
    })
    this.resetForm()

  }

  updateParent() {
    this.studentReceptionService.editParent(this.StudentReceptionParentForm.value).toPromise().then((response: BaseResponse<studentReceptionParentDto>) => {
      if (response?.code == 200) {
        this.toastr.success(response.message);
        this.parents = response.result;
      }
    })
    this.resetParentForm();
  }

  updateExam() {
    this.studentReceptionService.editExam(this.StudentReceptionExamForm.value).toPromise().then((response: BaseResponse<studentReceptionParentDto>) => {
      if (response?.code == 200) {
        this.toastr.success(response.message);
        this.exams = response.result;
      }
    })
    this.resetExamForm();
  }


  teachers: any = [];

  async getTeacherBySubjectId(subject: Subject) {
    await this.EmployeeService.getEmployeesBySubject(subject.id).toPromise().then((respnse: BaseResponse<Teacher>) => {
      if (respnse?.code == 200) {
        this.teachers = respnse.result;
        this.StudentReceptionExamForm.patchValue({
          teacher: this.teachers[0]
        })
      }
    })
  }


  shower: boolean = true;
  teacherShower(event: any) {
    this.shower = event.target.checked;
    if (!event.target.checked) {
      this.StudentReceptionExamForm.patchValue({
        teachers: null
      })
    }
  }

  resetForm() {
    this.StudentReceptionForm.reset();
    this.StudentReceptionParentForm.reset();
    this.selectedStudent = null;
    this.parents = []
  }

  resetParentForm() {
    this.StudentReceptionParentForm.reset();
    this.selectedParent = null;
  }

  resetExamForm() {
    this.StudentReceptionExamForm.reset();
    this.shower = true;
    this.selectedExam = null;
  }

  openStudentDetailsModal(modalContent: any, student: studentReceptionDto) {
    this.selectStudent(student)
    this.modalService.open(modalContent, {scrollable: true, size: 'xl'})
  }

  openStatisticsModal(modalContent: any) {
    this.modalService.open(modalContent, {scrollable: true, size: 'lg'})
  }

  openStudentAddModal(modalContent: any, student?: studentReceptionDto) {
    this.resetForm()
    this.modalService.open(modalContent, {scrollable: true, size: 'lg'})
  }
}
