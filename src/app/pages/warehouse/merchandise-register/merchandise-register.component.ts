import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MerchandiseGroupService } from '../merchandise-group/merchandise-group.service';
import { MerchandiseTypeService } from '../merchandise-type/merchandise-type.service';
import { MerchandiseRegisterService } from './merchandise-register.service';

@Component({
  selector: 'app-merchandise-register',
  templateUrl: './merchandise-register.component.html',
  styleUrls: ['./merchandise-register.component.scss']
})
export class MerchandiseRegisterComponent implements OnInit {
  data: any = [];
  searchregister: any;
  isChecked: boolean = false;
  isExpired: boolean = false;
  merchandise_group: any;
  merchandise_type: any;
  submitted = false;
  currentparentmerchandise: any;
  currentmerchandisegroup!: any;

  constructor(private Service: MerchandiseRegisterService,
    private merchandisegroup: MerchandiseGroupService,
    private merchandisetype: MerchandiseTypeService,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getMerchandiseRegisters();
    this.getMerchandisegroups()
    this.getMerchandisetypes();
    this.currentmerchandisegroup ? this.getparentmerchandisegroups() : "";
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  form = new FormGroup({
    barcode: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required]),
    parentgroup: new FormControl('', [Validators.required]),
    hasExpired: new FormControl('', [Validators.required]),
    info: new FormControl('', [Validators.required]),
    maxCount: new FormControl(''),
    minCount: new FormControl(''),
    minmax: new FormControl(''),
    salePrice: new FormControl('', [Validators.required]),
    ratio: new FormControl('', [Validators.required]),
    tip: new FormControl('', [Validators.required]),
    tipEnter: new FormControl('', [Validators.required]),
  });
  getMerchandiseRegisters() {
    this.Service.getMerchandiseRegisters('').subscribe((res: any) => {
      this.data = res.result;
    });
  }
  getMerchandisegroups() {
    this.merchandisegroup.getMerchandisegroups('').toPromise().then(response => {
      this.merchandise_group = response.result
    })
  }
  getMerchandisetypes() {
    this.merchandisetype.getMerchandiseTypes('').toPromise().then(response => {
      this.merchandise_type = response.result
    })
  }
  async getparentmerchandisegroups() {
    this.form.get('parentgroup')?.setValue('');
    await this.merchandisegroup.getMerchandisesByParent(this.currentmerchandisegroup).toPromise().then(data => {
      this.currentparentmerchandise = data.result
    });

  }
  currentvalue() {
    this.isChecked = !this.isChecked;
  }

  async addMerchandiseRegister() {
    this.submitted = true;
    var data = {
      barcode: this.form.controls['barcode'].value,
      group: {
        id: this.form.controls['parentgroup'].value,
      },
      salePrice: this.form.controls['salePrice'].value,
      hasExpired: this.form.controls['hasExpired'].value,
      info: this.form.controls['info'].value,
      minmax: this.isChecked,
      maxCount: this.isChecked ? this.form.controls['maxCount'].value : "",
      minCount: this.isChecked ? this.form.controls['minCount'].value : "",
      ratio: this.form.controls['ratio'].value,
      tip: {
        id: this.form.controls['tip'].value
      },
      tipEnter: {
        id: this.form.controls['tipEnter'].value
      },
    };
    if (!this.form.invalid) {
      let response = await this.Service.addMerchandiseRegister(data).toPromise();
      if (response) {
        this.getMerchandiseRegisters();
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
  async editMerchandiseRegister() {
    var data = {
      id: this.selectedMerchandiseRegister.id,
      info: this.form.controls['info'].value,
      barcode: this.form.controls['barcode'].value,
      hasExpired: this.form.controls['hasExpired'].value,
      salePrice: this.form.controls['salePrice'].value,
      group: {
        id: this.form.controls['parentgroup'].value,

      },
      minmax: this.form.controls['minmax'].value,
      maxCount: this.isChecked ? this.form.controls['maxCount'].value : "",
      minCount: this.isChecked ? this.form.controls['minCount'].value : "",
      ratio: this.form.controls['ratio'].value,
      tip: {
        id: this.form.controls['tip'].value
      },
      tipEnter: {
        id: this.form.controls['tipEnter'].value
      },
    };

    console.log(data)
    let response = await this.Service.editMerchandiseRegister(data).toPromise();
    if (response) {
      this.toastr.success(response.message)
      this.getMerchandiseRegisters();
      this.form.reset();
    }
  }
  async delMerchandiseRegister(data: any) {
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
        this.Service.delMerchandiseRegister(data.id)
          .toPromise()
          .then((response) => {
            if (response) {

              this.getMerchandiseRegisters();
              this.onReset();
              this.toastr.success(response.message);
            }
          })
      }
    });
  }
  selectedMerchandiseRegister: any = [];
  async selectMerchandiseRegister(id: any) {

    await this.Service.getMerchandiseRegisterById(id).toPromise().then(data => {
      this.selectedMerchandiseRegister = data.result;
    })
    this.currentmerchandisegroup = this.selectedMerchandiseRegister.group.parent.id;
    this.getparentmerchandisegroups();
    this.form.get('info')?.setValue(this.selectedMerchandiseRegister.info);
    this.form.get('barcode')?.setValue(this.selectedMerchandiseRegister.barcode);
    this.form.get('salePrice')?.setValue(this.selectedMerchandiseRegister.salePrice);
    this.form.get('parentgroup')?.setValue(this.selectedMerchandiseRegister.group.id);
    this.form.get('group')?.setValue(this.selectedMerchandiseRegister.group.parent.id);
    this.form.get('hasExpired')?.setValue(this.selectedMerchandiseRegister.hasExpired);
    this.form.get('maxCount')?.setValue(this.selectedMerchandiseRegister.maxCount);
    this.form.get('minCount')?.setValue(this.selectedMerchandiseRegister.minCount);
    this.selectedMerchandiseRegister.minmax ? this.isChecked = true : this.isChecked = false;
    this.form.get('minmax')?.setValue(this.selectedMerchandiseRegister.minmax);
    this.form.get('ratio')?.setValue(this.selectedMerchandiseRegister.ratio);
    this.form.get('tip')?.setValue(this.selectedMerchandiseRegister.tip.id);
    this.form.get('tipEnter')?.setValue(this.selectedMerchandiseRegister.tipEnter.id);

  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
