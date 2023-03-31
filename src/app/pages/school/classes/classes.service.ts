import {Injectable} from '@angular/core';
import {BaseService} from 'src/app/services/base/base.service'
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService extends BaseService {


  // -----------------------------------------------------------------------------------------------------
  // @ get classes by list 1-11
  // -----------------------------------------------------------------------------------------------------
  public getClassesList(request: any): Observable<any> {
    return this.get<any>('/school/api/v1/class/prefix', request)
  }

  public getTendencyList(request: any): Observable<any> {
    return this.get<any>('/school/api/v1/class-tendency', request)
  }

  // -----------------------------------------------------------------------------------------------------
  // @ get classes by year
  // -----------------------------------------------------------------------------------------------------
  public getClassesByYear(request: any): Observable<any> {
    return this.get<any>('/school/api/v1/class-yearly/year/' + request, '')
  }

  public getAllByClassYearlyAndTeacher(classYearlyId: string, teacherId: string) {
    return this.get<any>(`/school/api/v1/class-yearly-lesson/yearly/${classYearlyId}/teacher/${teacherId}/distinct`, null)
  }

  // -----------------------------------------------------------------------------------------------------
  // @ get class by id
  // -----------------------------------------------------------------------------------------------------
  public getClassById(request: any): Observable<any> {
    return this.get<any>('/school/api/v1/class-yearly/' + request, '')
  }

  // -----------------------------------------------------------------------------------------------------
  // @ get years
  // -----------------------------------------------------------------------------------------------------
  public getYears(request: any): Observable<any> {
    return this.get<any>('/school/api/v1/yearly', request)
  }

  // -----------------------------------------------------------------------------------------------------
  // @ get sections
  // -----------------------------------------------------------------------------------------------------
  public getSections(request: any): Observable<any> {
    return this.get<any>('/school/api/v1/class-section', request)
  }

  // -----------------------------------------------------------------------------------------------------
  // add class
  // -----------------------------------------------------------------------------------------------------
  public addClass(request: any): Observable<any> {
    return this.post<any>('/school/api/v1/class-yearly', request)
  }

  // -----------------------------------------------------------------------------------------------------
  // edit class
  // -----------------------------------------------------------------------------------------------------
  public editClass(request: any): Observable<any> {
    return this.put<any>('/school/api/v1/class-yearly', request)
  }

  // -----------------------------------------------------------------------------------------------------
  // delete class
  // -----------------------------------------------------------------------------------------------------
  public delClass(request: any): Observable<any> {
    return this.delete<any>('/school/api/v1/class-yearly/' + request, '')
  }

}
