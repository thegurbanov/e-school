import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { DepartmentsService } from './departments.service';
@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {
  department!: any;
  data: any = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  submitted = false;

  form = new FormGroup({
    info: new FormControl('', [
      Validators.required,
      Validators.min(2),
      Validators.max(200),
    ]),
  });

  constructor(
    private Service: DepartmentsService,
    private toastr: ToastrService
  ) { }
  formFieldHelpers: string[] = [''];
  ngOnInit(): void {
    this.getDepartments();
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

  getDepartments() {
    this.Service.getDepartments('').subscribe((res: any) => {
      this.data = res.result;
    });
  }

  async add() {
    this.submitted = true;
    var data = {
      info: this.form.controls['info'].value,
    };

    let response = await this.Service.addDepartment(data).toPromise();
    if (response) {
      this.getDepartments();
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

  async delete(year: any) {
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
        this.Service.delDepartment(year.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getDepartments();
              this.toastr.success(response.message);
            }
          })

      }
    });
  }

  async update() {
    this.submitted = true;
    var data = {
      id: this.selectedDepartment.id,
      info: this.form.controls['info'].value,
    };
    let response = await this.Service.editDepartment(data).toPromise();
    if (response) {
      this.getDepartments();
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

  selectedDepartment: any = [];
  selectDepartment(year: any) {
    this.selectedDepartment = year;
    this.form.get('info')?.setValue(year.info);
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
