import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { InterfaceLanguageService } from './interface-language.service';

@Component({
  selector: 'app-interface-language',
  templateUrl: './interface-language.component.html',
  styleUrls: ['./interface-language.component.scss']
})
export class InterfaceLanguageComponent implements OnInit {
  data: any = [];
  language: any;
  submitted = false;

  constructor(private Service: InterfaceLanguageService,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getBanks();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.InterfaceLanguageForm.controls;
  }
  InterfaceLanguageForm = new FormGroup({
    info: new FormControl('', [Validators.required]),
    aze: new FormControl(''),
    eng: new FormControl(''),
    tur: new FormControl(''),
    rus: new FormControl(''),
    deu: new FormControl(''),
    spa: new FormControl(''),
    ita: new FormControl(''),
    fra: new FormControl(''),
  });
  getBanks() {
    this.Service.getBanks('').subscribe((res: any) => {
      this.data = res.result;
    });
  }
  async addBank() {
    this.submitted = true;
    var data = {
      info: this.InterfaceLanguageForm.controls['info'].value,
      aze: this.InterfaceLanguageForm.controls['aze'].value,
      eng: this.InterfaceLanguageForm.controls['eng'].value,
      tur: this.InterfaceLanguageForm.controls['tur'].value,
      rus: this.InterfaceLanguageForm.controls['rus'].value,
      deu: this.InterfaceLanguageForm.controls['deu'].value,
      spa: this.InterfaceLanguageForm.controls['spa'].value,
      ita: this.InterfaceLanguageForm.controls['ita'].value,
      fra: this.InterfaceLanguageForm.controls['fra'].value,
    };
    if (!this.InterfaceLanguageForm.invalid) {
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
      id: this.selectedInterfaceLanguage.id,
      info: this.InterfaceLanguageForm.controls['info'].value,
      aze: this.InterfaceLanguageForm.controls['aze'].value,
      eng: this.InterfaceLanguageForm.controls['eng'].value,
      tur: this.InterfaceLanguageForm.controls['tur'].value,
      rus: this.InterfaceLanguageForm.controls['rus'].value,
      deu: this.InterfaceLanguageForm.controls['deu'].value,
      spa: this.InterfaceLanguageForm.controls['spa'].value,
      ita: this.InterfaceLanguageForm.controls['ita'].value,
      fra: this.InterfaceLanguageForm.controls['fra'].value,
    };
    let response = await this.Service.editBank(data).toPromise();
    if (response) {
      this.toastr.success('Məlumat uğurla yeniləndi')
      this.getBanks();
      this.InterfaceLanguageForm.reset();
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
  selectedInterfaceLanguage: any = [];
  async selectBank(id: any) {
    await this.Service.getBankById(id).toPromise().then(data => {
      this.selectedInterfaceLanguage = data.result;
    })
    this.InterfaceLanguageForm.get('info')?.setValue(this.selectedInterfaceLanguage.info);
    this.InterfaceLanguageForm.get('aze')?.setValue(this.selectedInterfaceLanguage.aze);
    this.InterfaceLanguageForm.get('eng')?.setValue(this.selectedInterfaceLanguage.eng);
    this.InterfaceLanguageForm.get('tur')?.setValue(this.selectedInterfaceLanguage.tur);
    this.InterfaceLanguageForm.get('rus')?.setValue(this.selectedInterfaceLanguage.rus);
    this.InterfaceLanguageForm.get('deu')?.setValue(this.selectedInterfaceLanguage.deu);
    this.InterfaceLanguageForm.get('spa')?.setValue(this.selectedInterfaceLanguage.spa);
    this.InterfaceLanguageForm.get('ita')?.setValue(this.selectedInterfaceLanguage.ita);
    this.InterfaceLanguageForm.get('fra')?.setValue(this.selectedInterfaceLanguage.fra);
  }
  onReset(): void {
    this.submitted = false;
    this.InterfaceLanguageForm.reset();
  }
}