import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CashboxesService extends BaseService {

  public getCashboxes(request: any): Observable<any> {
    return this.get<any>('/accounting/api/v1/kassa', request)
  }
  public getCashboxById(request: any): Observable<any> {
    return this.get<any>('/accounting/api/v1/kassa/' + request, '')
  }
  public addCashbox(request: any): Observable<any> {
    return this.post<any>('/accounting/api/v1/kassa', request)
  }
  public editCashbox(request: any): Observable<any> {
    return this.put<any>('/accounting/api/v1/kassa', request)
  }
  public delCashbox(request: any): Observable<any> {
    return this.delete<any>('/accounting/api/v1/kassa/' + request, '')
  }
  public getCashierByCashbox(request: any): Observable<any> {
    return this.get<any>('/accounting/api/v1/kassa-cashier/kassa/' + request, '')
  }
  public delCashier(request :any):Observable<any>
  {
    return this.delete<any>('/accounting/api/v1/kassa-cashier/' + request, '')
  }
  public addCashierToCashbox(request:any):Observable<any>
  {
    return this.post<any>('/accounting/api/v1/kassa-cashier', request)
  }
}
