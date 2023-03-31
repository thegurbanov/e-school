import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService extends BaseService {


  public getYears(request: any): Observable<any> {
    return this.get<any>('/school/api/v1/yearly', request)
  }


  public addYear(request: any): Observable<any> {
    return this.post<any>('/school/api/v1/yearly', request)
  }
  public editYear(request: any): Observable<any> {
    return this.put<any>('/school/api/v1/yearly/', request)
  }


  public delYear(request: any): Observable<any> {
    return this.delete<any>('/school/api/v1/yearly/' + request, '')
  }

}
