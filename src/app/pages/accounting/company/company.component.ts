import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  data: any = [];
  submitted = false;
  company!: any;
  form = new FormGroup({
    info: new FormControl('', [
      Validators.required
    ]),
    voen: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private Service: CompanyService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCompanies();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getCompanies() {
    this.Service.getCompanies('').subscribe((res: any) => {
      this.data = res.result;
    });
  }

  async addCompany() {
    this.submitted = true;
    var data = {
      info: this.form.controls['info'].value,
      voen: this.form.controls['voen'].value,
    };

    let response = await this.Service.addCompany(data).toPromise();
    if (response) {
      this.getCompanies();
      if (response?.code == 200) {
        this.onReset();
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
    } else {
      this.toastr.error(response.message);
    }
  }
  async updateCompany() {
    this.submitted = true;
    var data = {
      id: this.selectedCompany.id,
      info: this.form.controls['info'].value,
      voen: this.form.controls['voen'].value,
    };
    let response = await this.Service.editCompany(data).toPromise();
    if (response) {
      this.getCompanies();
      if (response?.code == 200) {
        this.onReset();
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
    } else {
      this.toastr.error(response.message);
    }
  }
  deleteCompany(company: any) {
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
        this.Service.delCompany(company.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getCompanies();
              this.toastr.success(response.message);
            }
          })

      }
    });
  }


  selectedCompany: any = [];
  async selectCompany(id: any) {
    await this.Service.getCompanyById(id).toPromise().then(data => {
      this.selectedCompany = data.result;
    })
    this.form.get('info')?.setValue(this.selectedCompany.info);
    this.form.get('voen')?.setValue(this.selectedCompany.voen);
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
