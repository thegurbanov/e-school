import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MerchandiseTypeService } from './merchandise-type.service';

@Component({
  selector: 'app-merchandise-type',
  templateUrl: './merchandise-type.component.html',
  styleUrls: ['./merchandise-type.component.scss']
})
export class MerchandiseTypeComponent implements OnInit {
  data: any = [];
  submitted = false;
  merchandisetype!: any;
  form = new FormGroup({
    info: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private Service: MerchandiseTypeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getMerchandiseTypes();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getMerchandiseTypes() {
    this.Service.getMerchandiseTypes('').subscribe((res: any) => {
      this.data = res.result;
    });
  }

  async addMerchandiseType() {
    this.submitted = true;
    var data = {
      info: this.form.controls['info'].value,
    };
    if (!this.form.invalid) {
      let response = await this.Service.addMerchandiseType(data).toPromise();
      if (response) {
        this.getMerchandiseTypes();
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
  async editMerchandiseType() {
    this.submitted = true;
    var data = {
      id: this.selectedMerchandiseType.id,
      info: this.form.controls['info'].value,
    };
    let response = await this.Service.editMerchandiseType(data).toPromise();
    if (response) {
      this.getMerchandiseTypes();
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
  delMerchandiseType(merchandisetype: any) {
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
        this.Service.delMerchandiseType(merchandisetype.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getMerchandiseTypes();
              this.toastr.success(response.message);
            }
          })

      }
    });
  }


  selectedMerchandiseType: any = [];
  async selectMerchandiseType(id: any) {
    await this.Service.getMerchandiseTypeById(id).toPromise().then(data => {
      this.selectedMerchandiseType = data.result;
    })
    this.form.get('info')?.setValue(this.selectedMerchandiseType.info);
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
