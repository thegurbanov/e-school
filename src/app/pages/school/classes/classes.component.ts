import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {BaseResponse} from 'src/app/model/base.dto';
import {ClassSection, ClassYearly, Student,} from 'src/app/model/school/class.dto';
import Swal from 'sweetalert2';
import {EmployeesService} from '../../hr/employees/employees.service';
import {ClassesService} from './classes.service';
import {StudentsService} from '../students/students.service';
import {BranchRoomService} from '../../dashboard/branch-room/branch-room.service';
import {Employee} from 'src/app/model/organization/employee.dto';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  data: any = [];
  teachers: any = [];
  filterclass!: any;
  temayuls: any = [];
  classesTableColumns: string[] = ['info', 'modify'];
  subjectsTableColumns: string[] = ['info', 'modify'];
  studentsTableColumns: string[] = [
    'secondName',
    'firstName',
    'fatherName',
    'matherName',
    'modify',
  ];

  navs: any = [
    {
      title: 'Sinif',
      status: true,
      id: 1,
    },
    {
      title: 'Şagirdlər',
      status: false,
      id: 2,
    },
  ];

  selectedNav = this.navs[0];

  ClassForm!: FormGroup;
  SubjectForm!: FormGroup;
  StudentForm!: FormGroup;

  constructor(
    private Service: ClassesService,
    private StuService: StudentsService,
    private BranchRoomService: BranchRoomService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private EmployeesService: EmployeesService,
    private modalService: NgbModal) {
  }

  formFieldHelpers: string[] = [''];

  ngOnInit(): void {
    this.createForm()
    this.getCurrentYear();
    this.getStudents();
    this.getSections();
    this.getAllTendency();
    this.getAll();
    this.getRooms()
  }

  createForm() {
    this.ClassForm = this.formBuilder.group({
      utis: ['', Validators.required],
      classPrefix: ['', Validators.required],
      classPrefixIndicator: ['', Validators.required],
      classSection: ['', Validators.required],
      tendency: ['', Validators.required],
      header: ['', Validators.required],
      branchRoom: [''],
      id: [null]
    });
  }

  changeTab(nav: any, modalContent: any) {
    this.navs.filter((x: any) => {
      x.status = false;
      if (x.id == nav.id) {
        x.status = true;
        this.selectedNav = x;
      }
    });

    if (nav.id === 2) {
      this.modalService.open(modalContent, {scrollable: true, size: "lg"})
    }
  }

  /**
   * get current year for classes
   */

  year: any = [];
  years: any = [];
  async getCurrentYear() {
    let response;
    if ((response = (await this.Service.getYears('').toPromise()).result)) {
      this.years = response;
      this.year = this.years.filter((x: any) => x.isCurrent)[0] ?? this.years[0];
      this.getClassesByYear(this.year);
    }
  }
  getAllTendency() {
    this.Service.getTendencyList('').subscribe((res: any) => {
      this.temayuls = res.result;
    })
  }
  async getAll() {
    await this.EmployeesService.getEmployees('').toPromise().then((response: BaseResponse<Employee>) => {
      if (response?.code == 200) {
        this.teachers = response.result;
      }
    })
  }
  _class!: ClassYearly;
  async getClassesByYear(year: any) {
    await this.Service.getClassesByYear(year.id)
      .toPromise()
      .then((response: BaseResponse<ClassYearly>) => {
        if (response?.code == 200) {
          this.data = response.result;
          this.selectedClass = this.data[0];
          this.getStudentsById(this.selectedClass.id);
          this.getClassById(this.selectedClass.id)
        } else {
          this.toastr.error(response.message);
        }
      })
  }

  section: any = [];
  sections: any = [];
  currentSectionID: any;
  async getSections() {
    await this.Service.getSections('')
      .toPromise()
      .then((response: BaseResponse<ClassSection>) => {
        if (response?.code == 200) {
          this.sections = response.result;
        }
      })

  }


  async add() {
    await this.Service.addClass(this.ClassForm.value)
      .toPromise()
      .then((response: BaseResponse<ClassYearly>) => {
        if (response && response?.code == 200) {
          this.ClassForm.reset();
          this.getClassesByYear(this.year);
        }
      })
  }

  async delete(_class: any) {
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
        this.Service.delClass(_class.id)
          .toPromise()
          .then((response: BaseResponse<ClassYearly>) => {
            if (response?.code == 200) {
              this.getClassesByYear(this.year);
              this.toastr.success(response.message);
            } else {
              this.toastr.error(response.message);
            }
          })

      }
    });
  }

  async update() {

    this.ClassForm.controls["id"].patchValue(this.selectedClass?.id)
    await this.Service.editClass(this.ClassForm.value).toPromise().then((response: BaseResponse<ClassYearly>) => {
      if (response?.code == 200) {
        this.data = response.result
        this.toastr.success(response.message)
        this.ClassForm.reset();
      }
      else {
        this.toastr.error(response.message)
      }
    })
  }

  selectedClass: any = [];
  selectClass(_class: any) {
    this.selectedClass = _class;

    this.getClassById(_class.id)

    this.getStudentsById(_class?.id);
  }

  setStudent(student: any) {
    this.student = student;
  }

  setSection(section: any) {
    this.section = section;
  }

  selectCurrentYear(data: any) {
    this.year = this.years.find((x: any) => x.id == data.id);
    this.getClassesByYear(this.year);
  }

  // add subject to current class
  async addStudentToCurrentClass() {
    var data = {
      classYearly: {
        id: this.selectedClass.id,
      },
      customer: {
        id: this.student.id,
      },
    };
    if (this.selectedClass) {
      await this.StuService.addStudentToCurrentClass(data)
        .toPromise()
        .then((response: any) => {
          if (response?.code == 200) {
            this.getStudentsById(this.selectedClass.id);
            this.student = [];
          } else {
            this.toastr.error(response.message);
          }
        });
    } else {
      this.toastr.warning('Sinif seçin');
    }
  }
  async deleteStudentFromCurrentClass(currentStudent: Student) {
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
        this.StuService.deleteStudentToCurrentClass(currentStudent.id)
          .toPromise()
          .then((response: BaseResponse<Student>) => {
            if (response?.code == 200) {
              this.getStudentsById(this.selectedClass.id);
              this.toastr.success(response.message);
            } else {
              this.toastr.error(response.message);
            }
          })
      }
    });
  }


  student: any;
  students: any = [];
  async getStudents() {
    let response;
    if (
      (response = (await this.StuService.getStudents('').toPromise()).result)
    ) {
      this.students = response;
      this.students.filter((student: any) => {
        student.fullName = student.secondName + ' ' + student.firstName;
      });
    }
  }

  currentClassStudents: any = [];
  async getStudentsById(id: string) {
    await this.StuService.getStudentsByClassId(id).toPromise().then((response: BaseResponse<Student>) => {
      if (response?.code == 200) {
        this.currentClassStudents = response.result;
      }
      else {
        this.toastr.error(response.message)
      }
    })
  }

  async getClassById(id: string) {
    await this.Service.getClassById(id).toPromise().then((response: BaseResponse<ClassYearly>) => {
      if (response?.code == 200) {
        this._class = response.result;

        this.ClassForm.patchValue({
          utis: this._class.utis,
          classPrefix: this._class.classPrefix,
          classPrefixIndicator: this._class.classPrefixIndicator,
          tendency: this._class.tendency,
          header: this._class.header,
          branchRoom: this._class.branchRoom,
          classSection: this._class.classSchool.section,
        })
      }
    })
  }

  room: any = [];
  rooms: any = [];
  async getRooms() {
    await this.BranchRoomService.getBranchrooms('').toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.rooms = response.result
      }
    })
  }

  openScrollableModal(content: any, size: string) {
    this.modalService.open(content, {scrollable: true, size})
  }

}
