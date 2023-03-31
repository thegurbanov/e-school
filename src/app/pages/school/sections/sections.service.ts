import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionsService extends BaseService {


  public getSections(request: any): Observable<any> {
    return this.get<any>('/school/api/v1/class-section', request)
  }


  public addSection(request: any): Observable<any> {
    return this.post<any>('/school/api/v1/class-section', request)
  }
  public editSection(request: any): Observable<any> {
    return this.put<any>('/school/api/v1/class-section', request)
  }


  public delSection(request: any): Observable<any> {
    return this.delete<any>('/school/api/v1/class-section/' + request, '')
  }

}
