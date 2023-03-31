import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/auth.models';
import { BaseResponse } from 'src/app/model/base.dto';
import { Student, Teacher } from 'src/app/model/school/class.dto';
import { ParentsService } from '../parents/parents.service';
import { StudentsService } from '../../school/students/students.service';
import { EmployeesService } from '../employees/employees.service';
import { RoleManagementService } from './role-management.service';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {
  userForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('modalShow') modalShow !: TemplateRef<any>;

  constructor(
    private RoleService: RoleManagementService,
    private EmployeesService: EmployeesService,
    private StudentService: StudentsService,
    private ParentService: ParentsService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) {

    this.userForm = new FormGroup({
      employee: new FormControl('', [
      ]),
      customer: new FormControl('', [
      ]),
      role: new FormControl('', [
        Validators.required,
      ]),
      lang: new FormControl('', [
        Validators.required,
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.min(2),
        Validators.max(200),
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
      active: new FormControl('true', [Validators.required])
    });
  }

  userType: string = 'teacher'
  userTypes: any = [
    {
      id: 2,
      info: 'employee',
      name: "İşçi"
    },
    {
      id: 3,
      info: 'student',
      name: "Şagird"
    },
    {
      id: 4,
      info: 'parent',
      name: "Valideyn"
    },
  ]

  languageList = [
    {
      value: "AZE",
      info: "Azərbaycan"
    },
    {
      value: "ENG",
      info: "English"
    },
    {
      value: "RUS",
      info: "Russian"
    }
  ]

  ngOnInit(): void {


    this.getTeachers();
    this.getStudents();
    this.getParents();
    this.getUsers();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }


  roles: any = [];
  async getRoles() {
    await this.RoleService.getRoles('').toPromise().then((response: BaseResponse<any>) => {
      if (response && response?.code == 200) {
        console.log(response.result)
        this.roles = response.result;
      }
    })
  }

  async editUser() {
    if (this.userType == 'employee') {
      this.userForm.removeControl('parent')
      this.userForm.removeControl('customer')
    }
    if (this.userType == 'customer') {
      this.userForm.removeControl('employee')
      this.userForm.removeControl('parent')
    }
    if (this.userType == 'parent') {
      this.userForm.removeControl('employee')
      this.userForm.removeControl('customer')
    }
    await this.RoleService.editUser(this.userForm.value).toPromise().then((response: BaseResponse<any>) => {
      if (response && response?.code == 200) {
        this.toastr.success(response.message);
        this.users = response.result
      }
    })
  }


  selectedUser: any;
  users: any = [];
  allUsers: any = []
  async getUsers() {
    await this.RoleService.getUsers('').toPromise().then((response: BaseResponse<any>) => {
      if (response && response?.code == 200) {
        this.users = response.result
        this.allUsers = response.result
      }
    }).then(() => {
      this.getRoles();
    })
  }


  async createUser() {

    if (this.userType == 'employee') {
      this.userForm.removeControl('customer')
    }
    else {
      this.userForm.removeControl('employee')
    }
    this.submitted = true;
    await this.RoleService.createUser(this.userForm.value).toPromise().then((response: BaseResponse<any>) => {
      if (response && response?.code == 200) {
        this.toastr.success(response.message);
        this.users = response.result;
        this.allUsers = response.result;
        this.submitted = false
        this.userForm.reset();
      }
      else {
        this.toastr.error(response.message)
        this.submitted = false

      }
    })
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.userForm.patchValue(user)
    this.userForm.patchValue({
      active: user?.active.toString()
    })
    if (user.role.id == '3') {
      this.userType = 'student'
    }
    if (user.role.id == '2') {
      this.userType = 'employee'
    }
    if (user.role.id == '4') {
      this.userType = 'parent'
    }
  }

  teachers: any = []
  async getTeachers() {
    await this.EmployeesService.getEmployees('').toPromise().then((response: BaseResponse<Teacher>) => {
      if (response && response?.code == 200) {
        this.teachers = response.result
      }
    })
  }

  async getStudents() {
    await this.StudentService.getStudents('').toPromise().then((response: BaseResponse<Student>) => {
      if (response && response?.code == 200) {
        this.customers = response.result;

      }
    })
  }

  customers: any = [];
  async getParents() {
    await this.ParentService.getParents('').toPromise().then((response: BaseResponse<Student>) => {
      if (response && response?.code == 200) {
        this.customers = response.result;

      }
    })
  }
  getCustomers(userType: string) {
    if (userType == 'student') {
      this.getStudents();
    }
    else if (userType == 'parent') {
      this.getParents();
    }
    else {
      this.getTeachers();
    }
    this.userForm.reset();
  }


  filterByRole(event?: any) {
    var id = event.target.value;
    if (id != 1) {
      this.users = this.allUsers;
      this.users = this.users.filter((x: any) => x.role.id == id);
    }
    else {
      this.users = this.allUsers;
    }

  }

  async changePass(userForm: any) {

    await this.RoleService.changePass(userForm).toPromise().then((response: BaseResponse<any>) => {
      if (response && response?.code == 200) {
        this.toastr.success(response.message);
        this.userForm.reset();
        this.users = response.result;
      }
    })
  }

  openModal(editUserPermissions: any, user: User) {
    this.modalService.open(editUserPermissions);
    this.selectedUser = user;
    this.getPermissions(user)
  }

  i!: number;
  permissions: any = [];
  async getPermissions(user: User) {
    let data = {
      username: user.username
    }
    await this.RoleService.getPermissions(data).toPromise().then((response: BaseResponse<any>) => {
      if (response && response?.code == 200) {
        this.permissions = response.result
        this.permissions.filter((x: any) => {
          x.isActive == false;
        })
      }
    })
  }

  rolemanage: any;
  async sendPermissions(permissions: any) {
    let username = this.selectedUser.username;

    await this.RoleService.sendPermissions(username, permissions).toPromise().then((response: BaseResponse<any>) => {
      if (response && response?.code == 200) {
        this.toastr.success(response.message);
        this.permissions = response.result
        this.modalService.dismissAll();
      }

    })
  }

  resetForm() {
    this.userForm.reset();
    this.selectedUser = null;
  }

}
