import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { BanksService } from '../bank/banks.service';
import { CurrenciesService } from '../currency/currencies.service';
import { BankAccountsService } from './bank-accounts.service';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.scss']
})
export class BankAccountsComponent implements OnInit {

  bankreport!: any;
  data: any = [];
  submitted = false;
  currency!: any;
  bank!: any;
  form = new FormGroup({
    bankAccount: new FormControl('', [
      Validators.required
    ]),
    currency: new FormControl('', [
      Validators.required
    ]),
    bank: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private Service: BankAccountsService,
    private currencyService: CurrenciesService,
    private bankService: BanksService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getBankReports();
    this.getBanks();
    this.getCurrencies();

  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getBankReports() {
    this.Service.getBankReports('').subscribe((res: any) => {
      this.data = res.result;

    });
  }
  getBanks() {
    this.bankService.getBanks('').subscribe((res: any) => {
      this.bank = res.result;

    });

  }
  getCurrencies() {
    this.currencyService.getCurrencies('').subscribe((res: any) => {
      this.currency = res.result;
      console.log(this.data);
    });

  }
  async addBankReports() {
    this.submitted = true;
    var data = {
      bank: { id: this.form.controls['bank'].value },
      currency: { id: this.form.controls['currency'].value },
      bankAccount: this.form.controls['bankAccount'].value,
    };
    console.log(data);


    let response = await this.Service.addBankReports(data).toPromise();
    if (response) {
      this.getBankReports();
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
  async editBankReports() {
    this.submitted = true;
    var data = {
      id: this.selectedBankReports.id,
      bankAccount: this.form.controls['bankAccount'].value,
      currency:
      {
        id: this.form.controls['currency'].value,
      },
      bank:
      {
        id: this.form.controls['bank'].value,
      }
    };
    let response = await this.Service.editBankReports(data).toPromise();
    if (response) {
      this.getBankReports();
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
  delBankReports(bankreports: any) {
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
        this.Service.delBankReports(bankreports.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getBankReports();
              this.toastr.success(response.message);
            }
          })

      }
    });
  }


  selectedBankReports: any = [];
  async selectBankReport(id: any) {
    await this.Service.getBankReportsById(id).toPromise().then(data => {
      this.selectedBankReports = data.result;
    })
    this.form.get('bankAccount')?.setValue(this.selectedBankReports.bankAccount);
    this.form.get('currency')?.setValue(this.selectedBankReports.currency.id);
    this.form.get('bank')?.setValue(this.selectedBankReports.bank.id);
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
