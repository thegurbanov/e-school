import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';
import { ConfigService } from 'src/app/services/general/config.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarDayService extends BaseService  {



  getCalendarDays() {
    return this.get<any>('/main/api/v1/work-calendar','');
  }
  deleteCalendarDays(id: string) {
    return this.delete<any>(
      '/main/api/v1/work-calendar/' + id,'');
  }

  addCalendarDays(data: any): Observable<any> {
    return this.post<any>(
      '/main/api/v1/work-calendar',
      data
    );
  }
  updateCalendarDays(data: any) {
    return this.put<any>(
      '/main/api/v1/work-calendar',
      data
    );
  }
}
