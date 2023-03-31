import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LessonHourService } from './lesson-hour.service';
import { ToastrService } from 'ngx-toastr';
import { BaseResponse } from 'src/app/model/base.dto';
import { LessonHour } from 'src/app/model/school/class.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lesson-hour',
  templateUrl: './lesson-hour.component.html',
  styleUrls: ['./lesson-hour.component.scss'],
})
export class LessonHourComponent implements OnInit {
  data: any = [];
  lessonhour!: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  form = new FormGroup({
    info: new FormControl('', [Validators.required]),
    sira: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(8),
    ]),
    startHour: new FormControl('', [Validators.required]),
    endHour: new FormControl('', [Validators.required]),
  });
  submitted = false;

  constructor(
    private Service: LessonHourService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCurrentYear();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  _lesson: any = [];
  lessons: any = [];

  async getLessonsByYear(id: string) {
    let response;
    if ((response = await this.Service.getLessonsByYear(id).toPromise())) {
      this.lessons = response.result;
      this._lesson = this.lessons[0];
    }
  }

  selectedLesson: any = [];
  async selectLesson(lesson: any) {
    this.Service.getLessonById(lesson.id).subscribe(
      (res: BaseResponse<LessonHour>) => {
        this.selectedLesson = res.result;
        this.form.get('info')?.setValue(this.selectedLesson.info);
        this.form.get('sira')?.setValue(this.selectedLesson.row);
        this.form.get('startHour')?.setValue(this.selectedLesson.startHour);
        this.form.get('endHour')?.setValue(this.selectedLesson.endHour);
      }
    );
  }

  async add() {
    this.submitted = true;

    var data = {
      info: this.form.controls['info'].value,
      row: this.form.get('sira')?.value,
      startHour: this.form.controls['startHour'].value,
      endHour: this.form.controls['endHour'].value,
    };

    if (!this.form.invalid) {
      let response = await this.Service.addLessonHour(data).toPromise();
      if (response) {
        this.getLessonsByYear(this.year.id);
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

  async update() {
    this.submitted = true;

    var data = {
      id: this.selectedLesson.id,
      info: this.form.controls['info'].value,
      row: this.form.get('sira')?.value,
      startHour: this.form.controls['startHour'].value,
      endHour: this.form.controls['endHour'].value,
    };

    if (!this.form.invalid) {
      let response = await this.Service.editLessonHour(data).toPromise();
      if (response) {
        this.getLessonsByYear(this.year.id);
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
  async delete(lesson: any) {
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
        this.Service.delLessonHour(lesson.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getLessonsByYear(this.year.id);
              if (response?.code == 200) {
                this.onReset();
                this.toastr.success(response.message);
              } else {
                this.toastr.error(response.message);
              }
            } else {
              this.toastr.error(response.message);
            }
          })

      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  year: any = [];
  years: any = [];
  async getCurrentYear() {
    let response;
    if ((response = await this.Service.getYears('').toPromise())) {
      this.years = response?.result;
      this.year = this.years[0];
      this.getLessonsByYear(this.year.id);
    }
  }

  selectCurrentYear(data: any) {
    this.year = this.years.find((x: any) => x.id == data.target.value);
    this.getLessonsByYear(data.target.value);
  }
}
