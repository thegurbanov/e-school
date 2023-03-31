import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {CurrenciesService} from './currencies.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
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
    coin: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private Service: CurrenciesService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCurrencies();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getCurrencies() {
    this.Service.getCurrencies('').subscribe((res: any) => {
      this.data = res.result;
    });
  }

  async addCurrency() {
    this.submitted = true;

    if (this.form.valid) {
      let response = await this.Service.addCurrency(this.form.value).toPromise();
      if (response) {
        this.getCurrencies();
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

  }
  async updateCurrency() {
    this.submitted = true;
    var data = {
      id: this.selectedCurrency.id,
      info: this.form.controls['info'].value,
      isoCode: this.form.controls['isoCode'].value,
      coin: this.form.controls['coin'].value,
    };
    let response = await this.Service.editCurrency(data).toPromise();
    if (response) {
      this.getCurrencies();
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
        this.Service.delCurrency(currency.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getCurrencies();
              this.toastr.success(response.message);
            }
          })

      }
    });
  }


  selectedCurrency: any = [];
  async selectCurrency(id: any) {
    await this.Service.getCurrencyById(id).toPromise().then(data => {
      this.selectedCurrency = data.result;
    })
    this.form.get('info')?.setValue(this.selectedCurrency.info);
    this.form.get('isoCode')?.setValue(this.selectedCurrency.isoCode);
    this.form.get('coin')?.setValue(this.selectedCurrency.coin);
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
