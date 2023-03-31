import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseService {
  public getCompanies(request: any): Observable<any> {
    return this.get<any>('/accounting/api/v1/company', request)
  }
  public getCompanyById(request: any): Observable<any> {
    return this.get<any>('/accounting/api/v1/company/' + request, '')
  }
  public addCompany(request: any): Observable<any> {
    return this.post<any>('/accounting/api/v1/company', request)
  }
  public editCompany(request: any): Observable<any> {
    return this.put<any>('/accounting/api/v1/company', request)
  }
  public delCompany(request: any): Observable<any> {
    return this.delete<any>('/accounting/api/v1/company/' + request, '')
  }

}
