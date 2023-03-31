import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MerchandiseGroupService } from './merchandise-group.service';

@Component({
  selector: 'app-merchandise-group',
  templateUrl: './merchandise-group.component.html',
  styleUrls: ['./merchandise-group.component.scss']
})
export class MerchandiseGroupComponent implements OnInit {

  MerchandiseForm!: FormGroup;
  ParentMerchandiseForm!: FormGroup
  merchandise!: any;
  parentmerchandise!: any;
  constructor(
    private Service: MerchandiseGroupService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.MerchandiseForm = this.formBuilder.group({
      info: ['', Validators.required],
    });
    this.ParentMerchandiseForm = this.formBuilder.group({
      info: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getMerchandisegroups();

  }
  data: any = [];
  async getMerchandisegroups() {
    await this.Service.getMerchandisegroups('')
      .toPromise()
      .then((response) => {
        this.data = response.result;
      });
  }

  async createMerchandise() {
    var data = {
      info: this.MerchandiseForm.controls['info'].value,
    };
    if (!this.MerchandiseForm.invalid) {
      let response = await this.Service.addMerchandise(data).toPromise();
      if (response) {
        this.toastr.success(response.message);
        this.getMerchandisegroups();
        this.MerchandiseForm.reset();
      }
    }
  }
  async delMerchandise(year: any) {
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
        this.Service.delMerchandise(year.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getMerchandisegroups();
              this.toastr.success(response.message);
            }
          })
      }
    });
  }

  async editMerchandise() {
    var data = {
      id: this.selectedMerchandise.id,
      info: this.MerchandiseForm.controls['info'].value,
    };
    await this.Service.editMerchandise(data)
      .toPromise()
      .then((response) => {
        if (response?.code == 200) {
          this.data = response.result;
          this.toastr.success(response.message);
          this.MerchandiseForm.reset();
        } else {
          this.toastr.error(response.message);
        }
      });
  }
  selectedMerchandise: any = [];
  async selectMerchandise(merchandise: any) {

    await this.Service.getMerchandiseById(merchandise.id).toPromise().then(data => {
      this.selectedMerchandise = data.result
    })
    this.MerchandiseForm.get('info')?.setValue(this.selectedMerchandise.info);
    this.getMerchandisesByParent(this.selectedMerchandise.id);
  }

  ////////////////Parent Merchandise///////Alt Kataloq methods/////////////
  parentmerchandises: any = [];
  parentMerchandiseId: any;
  async getMerchandisesByParent(id: any) {
    this.parentMerchandiseId = id;
    await this.Service.getMerchandisesByParent(id)
      .toPromise()
      .then((response) => {
        if (response?.code == 200) {
          this.parentmerchandises = response.result;

        } else {
          this.toastr.error(response.message);
        }
      })

  }
  async editParentMerchandise() {

    var data = {
      id: this.selectedParentMerchandise.id,
      info: this.ParentMerchandiseForm.controls['info'].value,
    };
    let response = await this.Service.editParentMerchandise(this.parentMerchandiseId, data).toPromise();
    if (response) {
      this.getMerchandisesByParent(this.parentMerchandiseId);
      if (response?.code == 200) {
        this.ParentMerchandiseForm.reset();
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
    } else {
      this.toastr.error(response.message);
    }
  }
  async addMerchandiseToParent() {
    var data = {
      info: this.ParentMerchandiseForm.controls['info'].value,
    };
    if (!this.MerchandiseForm.invalid) {
      let response = await this.Service.addMerchandiseToParent(this.parentMerchandiseId, data).toPromise();
      if (response) {
        this.toastr.success(response.message);
        this.parentmerchandises = response.result;
        this.ParentMerchandiseForm.reset();
      }
    }
  }
  async delParentMerchandise(parentmerchandise: any) {
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
        this.Service.delParentMerchandise(parentmerchandise.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getMerchandisesByParent(this.parentMerchandiseId)
              this.toastr.success(response.message);
            }
          })
      }
    });
  }
  selectedParentMerchandise: any = [];
  selectParentMerchandise(parentmerchandise: any) {
    this.selectedParentMerchandise = parentmerchandise;
    console.log(parentmerchandise);
    this.ParentMerchandiseForm.get('info')?.setValue(parentmerchandise.info);
  }
}
