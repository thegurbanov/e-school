import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { BanksService } from './banks.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  data: any = [];
  bank: any;
  submitted = false;

  constructor(private Service: BanksService,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getBanks();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.BankForm.controls;
  }
  BankForm = new FormGroup({
    info: new FormControl('', [Validators.required]),
    muxbirHesab: new FormControl('', [Validators.required]),
    branchCode: new FormControl('', [Validators.required]),
    voen: new FormControl('', [Validators.required]),
    iban: new FormControl('', [Validators.required]),
    swift: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });
  getBanks() {
    this.Service.getBanks('').subscribe((res: any) => {
      this.data = res.result;
    });
  }
  async addBank() {
    this.submitted = true;
    var data = {
      info: this.BankForm.controls['info'].value,
      muxbirHesab: this.BankForm.controls['muxbirHesab'].value,
      branchCode: this.BankForm.controls['branchCode'].value,
      voen: this.BankForm.controls['voen'].value,
      iban: this.BankForm.controls['iban'].value,
      swift: this.BankForm.controls['swift'].value,
      city: this.BankForm.controls['city'].value,
      address: this.BankForm.controls['address'].value,
      phone: this.BankForm.controls['phone'].value,
    };
    if (!this.BankForm.invalid) {
      let response = await this.Service.addBank(data).toPromise();
      if (response) {
        this.getBanks();
        if (response?.code == 200) {
          this.onReset();
          this.toastr.success(response.message);
        }
        else {
          this.toastr.error(response.message);
        }
      }
      else {
        this.toastr.error(response.message);
      }
    }
  }
  async editBank() {
    var data = {
      id: this.selectedBank.id,
      info: this.BankForm.controls['info'].value,
      muxbirHesab: this.BankForm.controls['muxbirHesab'].value,
      branchCode: this.BankForm.controls['branchCode'].value,
      voen: this.BankForm.controls['voen'].value,
      iban: this.BankForm.controls['iban'].value,
      swift: this.BankForm.controls['swift'].value,
      city: this.BankForm.controls['city'].value,
      address: this.BankForm.controls['address'].value,
      phone: this.BankForm.controls['phone'].value,
    };
    let response = await this.Service.editBank(data).toPromise();
    if (response) {
      this.toastr.success('Məlumat uğurla yeniləndi')
      this.getBanks();
      this.BankForm.reset();
    }
  }
  async deleteBank(data: any) {
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
        this.Service.delBank(data.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getBanks();
              this.toastr.success("Məlumat uğurla silindi");
            }
          })
      }
    });
  }
  selectedBank: any = [];
  async selectBank(id: any) {
    await this.Service.getBankById(id).toPromise().then(data => {
      this.selectedBank = data.result;
    })
    this.BankForm.get('info')?.setValue(this.selectedBank.info);
    this.BankForm.get('muxbirHesab')?.setValue(this.selectedBank.muxbirHesab);
    this.BankForm.get('branchCode')?.setValue(this.selectedBank.branchCode);
    this.BankForm.get('voen')?.setValue(this.selectedBank.voen);
    this.BankForm.get('iban')?.setValue(this.selectedBank.iban);
    this.BankForm.get('swift')?.setValue(this.selectedBank.swift);
    this.BankForm.get('city')?.setValue(this.selectedBank.city);
    this.BankForm.get('address')?.setValue(this.selectedBank.address);
    this.BankForm.get('phone')?.setValue(this.selectedBank.phone);
  }
  onReset(): void {
    this.submitted = false;
    this.BankForm.reset();
  }
}
