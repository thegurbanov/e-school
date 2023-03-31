import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { BaseResponse } from 'src/app/model/base.dto';
import { Employee } from 'src/app/model/organization/employee.dto';
import { Subject } from 'src/app/model/school/class.dto';
import Swal from 'sweetalert2';
import { EmployeesService } from '../../hr/employees/employees.service';
import { SubjectsService } from './subjects.service';
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnInit {
  recentTransactionsTableColumns: string[] = ['info', 'modify'];

  SubjectForm!: FormGroup;
  subject!: any;
  constructor(
    private Service: SubjectsService,
    private EmployeesService: EmployeesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.SubjectForm = this.formBuilder.group({
      id: [''],
      info: ['', Validators.required],
      infoEng: [''],
      infoRus: [''],
    });
  }
  formFieldHelpers: string[] = [''];
  ngOnInit(): void {
    this.getSubjects();
    this.getEmployees();
  }

  subjects: any = [];
  async getSubjects() {
    await this.Service.getSubjects('')
      .toPromise()
      .then((response: BaseResponse<Subject>) => {
        this.subjects = response.result;
      });
  }

  async createSubject() {
    if (!this.SubjectForm.invalid) {
      await this.Service.addSubject(this.SubjectForm.value).toPromise().then((response: BaseResponse<Subject>) => {
        if (response?.code == 200) {
          this.SubjectForm.reset();
          this.toastr.success(response.message)
        }
      }).then(() => {
        this.getSubjects();
      })
    }
  }
  async delSubject(year: any) {
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
        this.Service.delSubject(year.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getSubjects();
              this.toastr.success(response.message);
            }
          })

      }
    });
  }
  async editSubject() {
    await this.Service.editSubject(this.SubjectForm.value)
      .toPromise()
      .then((response: BaseResponse<Subject>) => {
        if (response?.code == 200) {
          this.toastr.success(response.message)
          this.subjects = response.result;
          this.SubjectForm.reset();
        }
      });
  }

  selectedSubject: any = [];


  async getSubjectById(subject: Subject) {
    await this.Service.getSubjectById(subject.id).toPromise().then((response: BaseResponse<Subject>) => {
      if (response?.code == 200) {
        this.selectedSubject = response.result;
        this.SubjectForm.patchValue(response.result);
      }
    }).then(() => {
      this.getEmployeesBySubject(this.selectedSubject);
    })
  }

  teacher!: Employee;
  teachers: any = [];
  async getEmployees() {
    await this.EmployeesService.getEmployees('')
      .toPromise()
      .then((response: BaseResponse<Employee>) => {
        this.teachers = response.result;
        this.teachers.filter((teacher: Employee) => {
          teacher.fullName = teacher.secondName + ' ' + teacher.firstName;
        });
      });
  }

  subjectEmployees: any = [];
  async getEmployeesBySubject(subject: any) {
    await this.EmployeesService.getEmployeesBySubject(subject.id)
      .toPromise()
      .then((response: BaseResponse<Employee>) => {
        if (response?.code == 200) {
          this.subjectEmployees = response.result;
        }
      })

  }
  async delEmployeeFromSubject(teacher: any) {
    var data = {
      teacherID: teacher.id,
      subjectID: this.selectedSubject.id,
    };
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
        this.EmployeesService.delEmployeeBySubject(data)
          .toPromise()
          .then((response: BaseResponse<Employee>) => {
            if (response?.code == 200) {
              this.toastr.success(response.message);
              this.subjectEmployees = response.result;
            } else {
              this.toastr.error(response.message);
            }
          })

      }
    });
  }

  async addEmployeeBySubject() {
    var data = {
      employee: {
        id: this.teacher.id,
      },
      subject: {
        id: this.selectedSubject.id,
      },
    };

    if (data.employee.id && this.selectedSubject.id) {
      await this.EmployeesService.addEmployeeBySubject(data)
        .toPromise()
        .then((response: BaseResponse<Employee>) => {
          if (response?.code == 200) {
            this.subjectEmployees = [];
            this.subjectEmployees = response.result;
            this.toastr.success(response.message);
          } else {
            this.toastr.error(response.message);
          }
        })

    } else {
      if (!this.selectedSubject.id) {
        this.toastr.error('Fənn seçin');
      } else {
        this.toastr.error('Müəllim seçin');
      }
    }
  }
}
