import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService extends BaseService {


  public getOrganizations(request: any): Observable<any> {
    return this.get<any>('/main/api/v1/class-organization', request)
  }

  public addOrganization(request: any): Observable<any> {
    return this.post<any>('/main/api/v1/class-organization', request)
  }
  public editOrganization(request: any): Observable<any> {
    return this.put<any>('/main/api/v1/class-organization', request)
  }

  public delOrganization(request: any): Observable<any> {
    return this.delete<any>('/main/api/v1/class-organization/' + request, '')
  }

}
