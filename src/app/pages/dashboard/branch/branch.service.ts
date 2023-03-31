import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class BranchService extends BaseService {


  public getBranches(request: any): Observable<any> {
    return this.get<any>('/main/api/v1/branch', request)
  }

  public getBranchById(request: any): Observable<any> {
    return this.get<any>('/main/api/v1/branch/' + request, '')
  }
  public addBranch(request: any): Observable<any> {
    return this.post<any>('/main/api/v1/branch', request)
  }
  public editBranch(request: any): Observable<any> {
    return this.put<any>('/main/api/v1/branch', request)
  }


  public delBranch(request: any): Observable<any> {
    return this.delete<any>('/main/api/v1/branch/' + request, '')
  }


}
