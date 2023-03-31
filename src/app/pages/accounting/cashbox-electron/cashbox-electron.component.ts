import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CashboxesElectronService } from './cashbox-electron.service';

@Component({
  selector: 'app-cashbox-electron',
  templateUrl: './cashbox-electron.component.html',
  styleUrls: ['./cashbox-electron.component.scss']
})
export class CashboxElectronComponent implements OnInit {
  data: any = [];
  submitted = false;
  currency!: any;
  form = new FormGroup({
    info: new FormControl('', [
      Validators.required
    ]),
    isoCode: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private Service: CashboxesElectronService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getAll() {
    this.Service.getAll('').subscribe((res: any) => {
      this.data = res.result;
    });
  }

  async add() {
    this.submitted = true;
    var data = {
      info: this.form.controls['info'].value,
      isoCode: this.form.controls['isoCode'].value,
    };

    let response = await this.Service.add(data).toPromise();
    if (response) {
      this.getAll();
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
  async update() {
    this.submitted = true;
    var data = {
      id: this.selectedCurrency.id,
      info: this.form.controls['info'].value,
      isoCode: this.form.controls['isoCode'].value,
    };
    let response = await this.Service.edit(data).toPromise();
    if (response) {
      this.getAll();
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
  deleteCurrency(currency: any) {
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
        this.Service.del(currency.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getAll();
              this.toastr.success(response.message);
            }
          })

      }
    });
  }


  selectedCurrency: any = [];
  async selectCurrency(id: any) {
    await this.Service.getById(id).toPromise().then(data => {
      this.selectedCurrency = data.result;
    })
    this.form.get('info')?.setValue(this.selectedCurrency.info);
    this.form.get('isoCode')?.setValue(this.selectedCurrency.isoCode);
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}

