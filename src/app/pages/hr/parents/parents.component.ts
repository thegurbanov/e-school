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
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { BaseResponse } from 'src/app/model/base.dto';
import { Parent, Student } from 'src/app/model/school/class.dto';
import { Subject } from 'src/app/model/school/class.dto';
import Swal from 'sweetalert2';
import { StudentsService } from '../../school/students/students.service';
import { ParentsService } from './parents.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent implements OnInit {


  genders: any = [{
    id: 1,
    info: "Kişi"
  },
  {
    id: 2,
    info: "Qadın "
  },
  ]
  recentTransactionsTableColumns: string[] = ['info', 'modify'];

  ParentForm!: FormGroup;
  parent!: any;
  submitted = false;
  constructor(
    private Service: ParentsService,
    private StudentService: StudentsService,
    private ParentService: ParentsService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.ParentForm = this.formBuilder.group({
      id: [''],
      fatherName: ['', [Validators.required, Validators.min(2), Validators.max(50)],],
      firstName: ['', [Validators.required, Validators.min(2), Validators.max(50)],],
      secondName: ['', [Validators.required, Validators.min(2), Validators.max(50)],],
      gender: ['', Validators.required]
    });


  }
  formFieldHelpers: string[] = [''];
  ngOnInit(): void {
    this.getParents();
    this.getStudents();

  }

  parents: any = [];
  async getParents() {
    await this.Service.getParents('')
      .toPromise()
      .then((response: BaseResponse<Parent>) => {
        this.parents = response.result;
      });
  }

  async createParent() {

    if (!this.ParentForm.invalid) {
      let response = await this.Service.addParent(this.ParentForm.value).toPromise();
      if (response) {
        this.getParents();
        this.ParentForm.reset();
      }
    }
  }
  async delParent(year: any) {
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
        this.Service.delParent(year.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getParents();
              this.toastr.success(response.message);
            }
          })

      }
    });
  }
  async editParent() {
    var data = {
      id: this.selectedParent.id,
      info: this.ParentForm.controls['info'].value,
    };
    await this.Service.editParent(data)
      .toPromise()
      .then((response: BaseResponse<Subject>) => {
        if (response?.code == 200) {
          this.parents = response.result;
          this.ParentForm.reset();
          this.submitted = false;
        }
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.ParentForm.controls;
  }

  student!: Student;
  students: any = [];
  async getStudents() {
    await this.StudentService.getStudents('')
      .toPromise()
      .then((response: BaseResponse<Student>) => {
        this.students = response.result;
      });
  }

  selectedParent: any = [];
  selectParent(parent: any) {
    this.selectedParent = parent;
    this.ParentForm.patchValue({
      firstName: parent.firstName,
      secondName: parent.secondName,
      fatherName: parent.fatherName
    })

    this.getStudentsByParent(parent);
  }

  async update() {
    this.submitted = true;

    this.ParentForm.patchValue({
      id: this.selectedParent.id,
    })
    await this.Service.editParent(this.ParentForm.value).toPromise().then((response: BaseResponse<Parent>) => {
      if (response?.code == 200) {
        this.getParents();
        this.submitted = false
        this.toastr.success(response.message);
      }


    })
  }

  parentStudents: any = [];
  async getStudentsByParent(parent: any) {
    await this.ParentService.getStudentsByParentId(parent.id)
      .toPromise()
      .then((response: BaseResponse<Student>) => {
        if (response?.code == 200) {
          this.parentStudents = response.result;
        }
      })

  }


}
