import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class BanksService extends BaseService {
  public getBanks(request: any): Observable<any> {
    return this.get<any>('/accounting/api/v1/bank', request)
  }
  public getBankById(request: any): Observable<any> {
    return this.get<any>('/accounting/api/v1/bank/' + request, '')
  }
  public addBank(request: any): Observable<any> {
    return this.post<any>('/accounting/api/v1/bank', request)
  }
  public editBank(request: any): Observable<any> {
    return this.put<any>('/accounting/api/v1/bank', request)
  }
  public delBank(request: any): Observable<any> {
    return this.delete<any>('/accounting/api/v1/bank/' + request, '')
  }
}
