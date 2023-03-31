import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService extends BaseService {

  public getCurrencies(request: any): Observable<any> {
    return this.get<any>('/accounting/api/v1/currency', request)
  }
  public getCurrencyById(request: any): Observable<any> {
    return this.get<any>('/accounting/api/v1/currency/' + request, '')
  }
  public addCurrency(request: any): Observable<any> {
    return this.post<any>('/accounting/api/v1/currency', request)
  }
  public editCurrency(request: any): Observable<any> {
    return this.put<any>('/accounting/api/v1/currency', request)
  }
  public delCurrency(request: any): Observable<any> {
    return this.delete<any>('/accounting/api/v1/currency/' + request, '')
  }

}
