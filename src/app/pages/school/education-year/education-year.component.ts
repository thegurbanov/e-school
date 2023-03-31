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
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { BaseResponse } from 'src/app/model/base.dto';
import { EducationYear, Yearly } from 'src/app/model/school/class.dto';
import Swal from 'sweetalert2';
import { EducationService } from './education.service';
@Component({
  selector: 'app-education-year',
  templateUrl: './education-year.component.html',
  styleUrls: ['./education-year.component.scss'],
})
export class EducationYearComponent implements OnInit {
  data: any = [];
  educationyear!: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  YearForm!: FormGroup;

  constructor(
    private Service: EducationService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.YearForm = this.formBuilder.group({
      info: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required],
    });
  }
  formFieldHelpers: string[] = [''];
  ngOnInit(): void {
    this.getYears();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getYears() {
    this.Service.getYears('').subscribe((res: any) => {
      this.data = res.result;
    });
  }

  async createYear() {
    var data = {
      info: this.YearForm.controls['info'].value,
      startYear: moment(this.YearForm.controls['startYear'].value).format(
        'DD.MM.yyyy'
      ),
      endYear: moment(this.YearForm.controls['endYear'].value).format(
        'DD.MM.yyyy'
      ),
    };

    if (!this.YearForm.invalid) {
      await this.Service.addYear(data).toPromise().then((response: BaseResponse<EducationYear>) => {
        if (response?.code == 200) {
          this.data = response.result
          this.YearForm.reset();
        }
      });
    }
  }


  async delYear(year: any) {
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
        this.Service.delYear(year.id)
          .toPromise()
          .then((response: BaseResponse<Yearly>) => {
            if (response?.code == 200) {
              this.data = response.result
              this.toastr.success(response.message);
            }
            else {
              this.toastr.error(response.message)
            }
          })

      }
    });
  }

  // async editYear() {
  //   var data = {
  //     id: this.selectedYear.id,
  //     info: this.YearForm.controls['info'].value,
  //     startYear: moment(this.YearForm.controls['startYear'].value).format(
  //       'DD.MM.yyyy'
  //     ),
  //     endYear: moment(this.YearForm.controls['endYear'].value).format(
  //       'DD.MM.yyyy'
  //     ),
  //   };
  //   await this.Service.editYear(data).toPromise().then((response: BaseResponse<EducationYear>) => {
  //     if (response?.code == 200) {
  //       this.getYears();
  //       this.YearForm.reset();
  //     }
  //     else {
  //       this.toastr.error(response.message)
  //     }
  //   }).catch((err: any) => {
  //     this.toastr.error(err);
  //   });

  // }

  selectedYear: any = [];
  // selectYear(year: any) {
  //   this.selectedYear = year;
  //   this.YearForm.get('info')?.setValue(year.info);
  //   this.YearForm.get('startYear')?.setValue(year.startYear);
  //   this.YearForm.get('endYear')?.setValue(year.endYear);
  // }


}
