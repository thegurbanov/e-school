import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService extends BaseService {


  public getSubjects(request: any): Observable<any> {
    return this.get<any>('/school/api/v1/subject', request)
  }
  public getSubjectById(request: any): Observable<any> {
    return this.get<any>('/school/api/v1/subject/' + request, '')
  }

  public getSubjectsByClass(request: any): Observable<any> {
    return this.get<any>('/school/api/v1/class-yearly-education-plan/class-yearly/' + request + "/subjects", '')
  }

  public addSubject(request: any): Observable<any> {
    return this.post<any>('/school/api/v1/subject', request)
  }
  public editSubject(request: any): Observable<any> {
    return this.put<any>('/school/api/v1/subject', request)
  }

  public delSubject(request: any): Observable<any> {
    return this.delete<any>('/school/api/v1/subject/' + request, '')
  }


}
