import {Injectable} from '@angular/core';
import {BaseService} from 'src/app/services/base/base.service'
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsReportService extends BaseService {

  public getStudents(request: any): Observable<any> {
    return this.get<any>('/school/api/v1/contract/yearly/search', request)
  }

  search(queryParams?: any[]) {
    let url = '/school/api/v1/contract/yearly/search?'
    if (queryParams) {
      for (let i = 0; i < queryParams.length; i++) {
        url += `${Object.keys(queryParams[i])[0]}=${queryParams[i][Object.keys(queryParams[i])[0]]}&`
      }
    }

    return this.get<any>(url, null)
  }

  getAllContractsForEducation() {
    return this.get<any>('/school/api/v1/contract/yearly/possible', null)
  }

}
