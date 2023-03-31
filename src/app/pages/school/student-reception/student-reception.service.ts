import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseService} from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class StudentReceptionService extends BaseService {

  public getStudents(yearlyId: string): Observable<any> {
    return this.get<any>('/school/api/v1/student-reseption/year/' + yearlyId, null)
  }

  public getStudentParents(request: any): Observable<any> {
    return this.get<any>(`/school/api/v1/student-reseption-parent/student/${request}`, '')
  }

  public getParent(request: any): Observable<any> {
    return this.get<any>(`/school/api/v1/student-reseption-parent`, request)
  }

  public getStudentExams(request: any): Observable<any> {
    return this.get<any>(`/school/api/v1/student-reseption-exam/student/${request}`, '')
  }
  public getExam(request: any): Observable<any> {
    return this.get<any>(`/school/api/v1/student-reseption-exam`, request)
  }


  public add(request: any): Observable<any> {
    return this.post<any>('/school/api/v1/student-reseption', request)
  }
  public addParentToStudent(request: any, studentId: string): Observable<any> {
    return this.post<any>(`/school/api/v1/student-reseption-parent/student/${studentId}`, request)
  }
  public addExamToStudent(request: any, studentId: string): Observable<any> {
    return this.post<any>(`/school/api/v1/student-reseption-exam/student/${studentId}`, request)
  }

  public edit(request: any): Observable<any> {
    return this.put<any>('/school/api/v1/student-reseption', request)
  }

  public chageStudentStatus(request: any): Observable<any> {
    return this.put<any>('/school/api/v1/student-reseption/status', request)
  }

  public editParent(request: any): Observable<any> {
    return this.put<any>('/school/api/v1/student-reseption-parent', request)
  }
  public editExam(request: any): Observable<any> {
    return this.put<any>('/school/api/v1/student-reseption-exam', request)
  }

  public remove(request: any): Observable<any> {
    return this.delete<any>('/school/api/v1/student-reseption/' + request, '')
  }

  public removeParent(request: any): Observable<any> {
    return this.delete<any>('/school/api/v1/student-reseption-parent/' + request, '')
  }

  public removeExam(request: any): Observable<any> {
    return this.delete<any>('/school/api/v1/student-reseption-exam/' + request, '')
  }

  public getStats() {
    return this.get<any>('/school/api/v1/student-reseption/statistics', null)
  }

}
