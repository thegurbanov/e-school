import {Injectable} from '@angular/core';
import {BaseService} from 'src/app/services/base/base.service'
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends BaseService {


  public getEmployees(request: any): Observable<any> {
    return this.get<any>('/main/api/v1/employee', request)
  }

    public getEmployeeById(request: any) {
      return this.get<any>('/main/api/v1/employee/' + request, '')
    }

    public getEmployeesBySubject(request: any): Observable<any> {
        return this.get<any>('/school/api/v1/subject-employee/subject/' + request + '/employee', '')
    }

    public addEmployee(request: any): Observable<any> {
        return this.post<any>('/main/api/v1/employee', request)
    }

    public editEmployee(request: any): Observable<any> {
        return this.put<any>('/main/api/v1/employee', request)
    }

    public delEmployee(request: any): Observable<any> {
        return this.delete<any>('/main/api/v1/employee/' + request, '')
    }

    public addEmployeeBySubject(request: any): Observable<any> {
        return this.post<any>('/school/api/v1/subject-employee', request)
    }
    public delEmployeeBySubject(request: any): Observable<any> {
        return this.delete<any>(`/school/api/v1/subject-employee/${request.subjectID}/${request.teacherID}`, '')
    }

}
