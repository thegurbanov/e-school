import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class BankAccountsService extends BaseService {

  public getBankReports(request: any): Observable<any> {
    return this.get<any>('/accounting/api/v1/bank-account', request)
  }
  public getBankReportsById(request: any): Observable<any> {
    return this.get<any>('/accounting/api/v1/bank-account/' + request, '')
  }
  public addBankReports(request: any): Observable<any> {
    return this.post<any>('/accounting/api/v1/bank-account', request)
  }
  public editBankReports(request: any): Observable<any> {
    return this.put<any>('/accounting/api/v1/bank-account', request)
  }
  public delBankReports(request: any): Observable<any> {
    return this.delete<any>('/accounting/api/v1/bank-account/' + request, '')
  }
}
