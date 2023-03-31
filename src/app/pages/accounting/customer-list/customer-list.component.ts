import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {Parent, Student} from 'src/app/model/school/class.dto';
import {ParentsService} from '../../hr/parents/parents.service';
import {BaseResponse} from 'src/app/model/base.dto';
import {GenderDto} from "../../../model/organization/gender.dto";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StudentsService} from "../../school/students/students.service";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  StudentForm!: FormGroup;
  ParentForm!: FormGroup;
  submitted = false;
  genders: GenderDto[] = []

  constructor(
    private Service: StudentsService,
    private toastr: ToastrService,
    private ParentService: ParentsService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.createForms()
    this.getCustomersAndRelatedLists()
  }

  createForms() {
    this.StudentForm = this.formBuilder.group({
      id: [''],
      fatherName: ['', [Validators.required, Validators.min(2), Validators.max(50)]],
      firstName: ['', [Validators.required, Validators.min(2), Validators.max(50)]],
      secondName: ['', [Validators.required, Validators.min(2), Validators.max(50)]],
      matherName: [''],
      gender: ['', Validators.required],
      dob: ['', Validators.required]
    });

    this.ParentForm = this.formBuilder.group({
      customer: [this.selectedCustomer, Validators.required],
      parent: ['', Validators.required],
      relationalShip: ['', Validators.required]
    })
  }

  getCustomersAndRelatedLists() {
    this.getStudents();
    this.getParents();
    this.getRelations();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.StudentForm.controls;
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }


  customers: any = [];

  async getStudents() {
    await this.Service.getStudents('').toPromise().then((response: BaseResponse<Student>) => {
      if (response?.code == 200) {
        this.customers = response.result
      }
    })
  }

  selectedCustomer: any = [];
  async getCustomerById(customer: Student) {
    await this.Service.getStudentById(customer.id).toPromise().then((response: BaseResponse<Student>) => {
      if (response?.code == 200) {
        this.StudentForm.patchValue(response.result);
        this.ParentForm.patchValue({
          customer: response.result
        })
        this.getParentsByStudent(response.result);
        this.selectedCustomer = response.result
      }
    })
  }

  customer!: any
  async add() {
    this.submitted = true;
    if (this.StudentForm.valid) {
      await this.Service.addStudent(this.StudentForm.value).toPromise().then((response: BaseResponse<Student>) => {
        if (response?.code == 200) {
          this.onReset();
          this.toastr.success(response.message);
        }
      }).then(() => {
        this.getStudents();
      })
    }
  }

  async delete(section: any) {
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
        this.Service.delStudent(section.id)
          .toPromise()
          .then((response:any) => {
            if (response) {
              this.getStudents();
              this.toastr.success(response.message);
            }
          })

      }
    });
  }

  async update() {
    this.submitted = true;
    let response = await this.Service.editStudent(this.StudentForm.value).toPromise();
    if (response) {
      if (response?.code == 200) {
        this.getStudents();
        this.onReset();
        this.toastr.success(response.message);
      }
    } else {
      this.toastr.error(response.message);
    }
  }



  onReset(): void {
    this.submitted = false;
    this.StudentForm.reset();
  }

  async deleteRelationFromCustomer(parent: any) {

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
        this.Service.delParentFromStudent(parent.id)
          .toPromise()
          .then((response: BaseResponse<Student>) => {
            if (response?.code == 200) {
              this.toastr.success(response.message);
              this.parentStudents = response.result;
            }
          })

      }
    });
  }

  async addRelationToCustomer() {
    if (this.ParentForm.valid) {
      await this.Service.addParentsToStudent(this.ParentForm.value)
        .toPromise()
        .then((response: BaseResponse<Student>) => {
          if (response?.code == 200) {
            this.parentStudents = [];
            this.parentStudents = response.result;
            this.toastr.success(response.message);
            this.ParentForm.reset()
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

  parentStudents: any = [];
  async getParentsByStudent(customer: any) {
    await this.Service.getParentsByStudentId(customer.id)
      .toPromise()
      .then((response: BaseResponse<Parent>) => {
        if (response?.code == 200) {
          this.parentStudents = response.result;
        }
      })

  }

  parents: any = [];

  async getParents() {
    await this.ParentService.getParents('')
      .toPromise()
      .then((response: BaseResponse<Parent>) => {
        this.parents = response.result;
      })
  }

  openScrollableModal(content: any, size: string) {
    this.modalService.open(content, {scrollable: true, size})
  }

}
