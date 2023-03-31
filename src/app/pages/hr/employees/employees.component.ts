import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormGroup,} from '@angular/forms';
import {EmployeesService} from './employees.service';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {Department} from "../../../model/organization/employee.dto";
import {BranchService} from "../../dashboard/branch/branch.service";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  teachers: any = [];
  teacher!: any;

  submitted = false;
  EmployeeForm!: FormGroup;
  EmployeePersonalForm!: FormGroup;
  branchList: Department[] = []

  genders: any = [{
    id: 1,
    info: "Kişi"
  },
  {
    id: 2,
    info: "Qadın"
  },
  ]
  navs: any =
    [
      {
        title: 'İşçi',
        status: true,
        id: 1,
      },
      {
        title: 'Əmr',
        status: false,
        id: 2,
      },
      {
        title: 'Şəxsi məlumatlar-2',
        status: false,
        id: 3,
      },
      {
        title: 'Təhsili',
        status: false,
        id: 4,
      },
      {
        title: 'Əcnəbi dil bilikləri',
        status: false,
        id: 5,
      },

      {
        title: 'Əmək fəaliyyəti',
        status: false,
        id: 6,
      },
      {
        title: 'Xarici ölkələrdə olması',
        status: false,
        id: 7,
      },
      {
        title: 'Ailə üzvləri',
        status: false,
        id: 8,
      },
    ]

  selectedNav = this.navs[0];
  subselectedNav = this.selectedNav ? this.navs[0] : "";
  constructor(
    private Service: EmployeesService,
    private toastr: ToastrService,

  ) {


  }

  formFieldHelpers: string[] = [''];
  ngOnInit(): void {
    this.getAll();
  }



  get f(): { [key: string]: AbstractControl } {
    return this.EmployeeForm.controls;
  }

  selectedEmployee: any = [];
  getAll() {
    this.Service.getEmployees('').subscribe((res: any) => {
      this.teachers = res.result;
    });
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
        this.Service.delEmployee(section.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getAll();
              this.toastr.success('Müəllim cədvəldən silindi');
            }
          })

      }
    });
  }

}
