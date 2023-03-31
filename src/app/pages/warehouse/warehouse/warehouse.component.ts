import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { DepartmentsService } from '../../hr/departments/departments.service';
import { WarehouseService } from './warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  department!: any;
  data: any = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  submitted = false;
  warehouse!: any;
  departments!: any;
  form = new FormGroup({
    info: new FormControl('', [
      Validators.required,
    ]),
    department: new FormControl('',
      [
        Validators.required
      ])
  });

  constructor(
    private Service: WarehouseService,
    private DepartmentService: DepartmentsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getWarehouses();
    this.getDepartments()
  }
  async getDepartments() {
    await this.DepartmentService.getDepartments('').toPromise().then(response => {
      this.departments = response.result;

    }).catch(err => {
      this.toastr.error(err.message)
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getWarehouses() {
    this.Service.getWarehouses('').subscribe((res: any) => {
      this.data = res.result;
    });
  }

  async addWarehouse() {
    this.submitted = true;
    var data = {
      department: { id: this.form.controls['department'].value },
      info: this.form.controls['info'].value,
    };

    console.log(data);
    let response = await this.Service.addWarehouse(data).toPromise();
    if (response) {
      this.getWarehouses();
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

  async delWarehouse(warehouse: any) {
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
        this.Service.delWarehouse(warehouse.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getWarehouses();
              this.toastr.success(response.message);
            }
          })

      }
    });
  }

  async editWarehouse() {
    this.submitted = true;
    var data = {
      id: this.selectedWarehouse.id,
      info: this.form.controls['info'].value,
      department:
      {
        id: this.form.controls['department'].value,
        branch: this.selectedWarehouse.department.branch
      }
    };


    let response = await this.Service.editWarehouse(data).toPromise();
    if (response) {
      this.getWarehouses();
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

  selectedWarehouse: any = [];
  async selectWarehouse(id: any) {

    await this.Service.getWarehouseById(id).toPromise().then(response => {
      this.selectedWarehouse = response.result;
    })
    this.form.get('info')?.setValue(this.selectedWarehouse.info);
    this.form.get('department')?.setValue(this.selectedWarehouse.department.id);
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
