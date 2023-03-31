import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { RoleManagementService } from '../../hr/role-management/role-management.service';
import { CashboxesService } from './cashboxes.service';

@Component({
  selector: 'app-cashbox',
  templateUrl: './cashbox.component.html',
  styleUrls: ['./cashbox.component.scss']
})
export class CashboxComponent implements OnInit {
  CashForm!: FormGroup;
  cashbox!: any;
  employee!: any;
  constructor(
    private Service: CashboxesService,
    private toastr: ToastrService,
    private RoleService: RoleManagementService,
    private formBuilder: FormBuilder
  ) {
    this.CashForm = this.formBuilder.group({
      info: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getCashboxes();
    this.getEmployees();
  }
  cashes: any = [];
  async getCashboxes() {
    await this.Service.getCashboxes('')
      .toPromise()
      .then((response) => {
        this.cashes = response.result;
      });
  }
  async createCashbox() {
    var data = {
      info: this.CashForm.controls['info'].value,
    };

    if (!this.CashForm.invalid) {
      let response = await this.Service.addCashbox(data).toPromise();
      if (response) {
        this.toastr.success("Məlumat uğurla əlavə edildi");
        this.getCashboxes();
        this.CashForm.reset();
      }
    }
  }
  async delCashbox(data: any) {
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
        this.Service.delCashbox(data.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getCashboxes();
              this.toastr.success("Melumat ugurla silindi");
            }
          })
      }
    });
  }
  async delCashier(cashier: any) {
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
        this.Service.delCashier(cashier.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.cashiers = response.result;
              this.toastr.success("Melumat ugurla silindi");
            }
          })
      }
    });
  }
  async editCashbox() {
    var data = {
      id: this.selectedCashbox.id,
      info: this.CashForm.controls['info'].value,
    };
    await this.Service.editCashbox(data)
      .toPromise()
      .then((response) => {
        if (response?.code == 200) {
          this.cashes = response.result;
          this.toastr.success("Melumat ugurla yenilendi");
          this.CashForm.reset();
        } else {
          this.toastr.error(response.message);
        }
      });
  }
  selectedCashbox: any = [];
  selectCashbox(cash: any) {
    this.selectedCashbox = cash;
    this.CashForm.get('info')?.setValue(cash.info);
    this.getCashierByCashbox(this.selectedCashbox);

  }
  cashiers: any = [];
  async getCashierByCashbox(cashbox: any) {
    await this.Service.getCashierByCashbox(cashbox.id)
      .toPromise()
      .then((response) => {
        if (response?.code == 200) {
          this.cashiers = response.result;
        } else {
          this.toastr.error(response.message);
        }
      })

  }
  employees: any = [];
  async getEmployees() {
    await this.RoleService.getUsers('').toPromise().then((response) => {
      if (response?.code == 200) {
        this.employees = response.result;

      }
      else {
        this.toastr.error(response.message)
      }
    })
  }
  async addCashierToCashbox() {
    var data = {
      cashier: {
        id: this.employee ? this.employee.id : this.toastr.error('Kassir seçin'),
      },
      kassa: {
        id: this.selectedCashbox ? this.selectedCashbox.id : this.toastr.error('Kassa seçin'),
      },
    };
    if (data.cashier.id && this.selectedCashbox.id) {
      await this.Service.addCashierToCashbox(data)
        .toPromise()
        .then((response) => {
          if (response?.code == 200) {
            this.cashiers = [];
            this.cashiers = response.result;
            this.toastr.success(response.message);
          } else {
            this.toastr.error(response.message);
          }
        })
    } else {
      if (!this.selectedCashbox.id) {
        this.toastr.error('Kassa seçin');
      } else {
        this.toastr.error('Kassir seçin');
      }
    }
  }
}
