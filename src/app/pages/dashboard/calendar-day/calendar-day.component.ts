import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CalendarDayService } from './calendar-day.service';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit {
  data: any = [];
  calendarday!: any;
  submitted = false;
  CalendarDayForm!: FormGroup;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ]
  };
  constructor(
    private Service: CalendarDayService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.CalendarDayForm = this.formBuilder.group({
      type: ['', [Validators.required, Validators.min(-1), Validators.max(4)]],
      info: ['', [Validators.required]],
    });
  }


  handleDateClick(arg:any) {
    alert('date click! ' + arg.dateStr)
  }
  ngOnInit(): void {
    this.getAllDays();
  }
  getAllDays() {
    return this.Service.getCalendarDays().subscribe((res) => {
      this.data = res.result;
    });
  }


  async update() {
    this.submitted = true;
    var data = {
      id: this.selectedYear.id,
      type: this.CalendarDayForm.controls['type'].value,
      info: moment(this.CalendarDayForm.controls['info'].value).format(
        'yyyy-MM-DD'
      ),
    };
    let response = await this.Service.updateCalendarDays(data).toPromise();
    if (response?.code == 200) {
      this.submitted = false;
      this.getAllDays();
      this.CalendarDayForm.reset();
      this.toastr.success('məlumat uğurla yeniləndi');
    }
  }

  async delete(calendarday: any) {
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
        this.Service.deleteCalendarDays(calendarday.id)
          .toPromise()
          .then((response) => {
            if (response?.code == 200) {
              this.getAllDays();
              this.toastr.success('Məlumat cədvəldən silindi');
            }
          })

      }
    });
  }

  add() {
    this.submitted = true;
    var data = {
      type: this.CalendarDayForm.controls['type'].value,

      info: moment(this.CalendarDayForm.controls['info'].value).format(
        'yyyy-MM-DD'
      ),
    };

    if (!this.CalendarDayForm.invalid) {
      this.submitted = false;
      this.Service.addCalendarDays(data).subscribe((response) => {
        this.CalendarDayForm.reset();
        this.getAllDays();
        this.toastr.success('məlumat əlavə edildi');
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.CalendarDayForm.controls;
  }
  onReset(): void {
    this.submitted = false;
    this.CalendarDayForm.reset();
  }

  selectedYear: any = [];
  selectCalendarDay(calendarday: any) {
    this.selectedYear = calendarday;
    this.CalendarDayForm.get('type')?.setValue(calendarday.type);

    this.CalendarDayForm.get('info')?.setValue(calendarday.info);
  }
}
