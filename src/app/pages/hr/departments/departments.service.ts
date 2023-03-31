import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService extends BaseService {


  public getDepartments(request: any): Observable<any> {
    return this.get<any>('/main/api/v1/department', request)
  }

  public addDepartment(request: any): Observable<any> {
    return this.post<any>('/main/api/v1/department', request)
  }
  public editDepartment(request: any): Observable<any> {
    return this.put<any>('/main/api/v1/department',request )
  }

  public delDepartment(request: any): Observable<any> {
    return this.delete<any>('/main/api/v1/department/'+request, '')
  }


}
