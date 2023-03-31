import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root',
})
export class LessonHourService extends BaseService {
  public getLessonsByYear(request: string): Observable<any> {
    return this.get<any>('/school/api/v1/lesson-hour/year/' + request, '');
  }
  public getLessonById(request: string): Observable<any> {
    return this.get<any>('/school/api/v1/lesson-hour/' + request, '');
  }

  public getYears(request: any): Observable<any> {
    return this.get<any>('/school/api/v1/yearly', request);
  }

  public getLessonHoursByYearId(yearId: string): Observable<any> {
    return this.get<any>('/school/api/v1/lesson-hour/year/' + yearId, '');
  }
  public addLessonHour(request: any): Observable<any> {
    return this.post<any>('/school/api/v1/lesson-hour', request);
  }
  public editLessonHour(request: any): Observable<any> {
    return this.put<any>('/school/api/v1/lesson-hour', request);
  }

  public delLessonHour(request: string): Observable<any> {
    return this.delete<any>('/school/api/v1/lesson-hour/' + request, '');
  }
}
