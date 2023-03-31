import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService extends BaseService {


  public getProgramsByYear(request: any): Observable<any> {
    return this.get<any>(`/school/api/v1/class-yearly-education-program/year/${request.yearID}/section/${request.classSectionId}/prefix/${request.prefix}/tendency/${request.tendencyID}/subject/${request.subjectID}`, '')
  }

  public addProgram(request: any): Observable<any> {
    return this.post<any>('/school/api/v1/class-yearly-education-program', request)
  }
  public editProgram(request: any): Observable<any> {
    return this.put<any>('/school/api/v1/class-yearly-education-program/', request)
  }

  public getProgramById(request: any): Observable<any> {
    return this.get<any>('/school/api/v1/class-yearly-education-program/' + request, '')
  }
  public delProgram(request: any): Observable<any> {
    return this.delete<any>('/school/api/v1/class-yearly-education-program/' + request, '')
  }

}
