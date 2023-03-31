import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GeneralService extends BaseService {
  readonly baseUrl = 'http://btk.ddns.net:7777';

  public getUserDetail(request: any): Observable<any> {
    return this.get<any>('/user/api/currentUser?mac=web&version=1.0', request)
  }
  public getData(url: string, request: any): Observable<any> {
    return this.get<any>(url, request)
  }
  public getCountries(request: string): Observable<any> {
    return this.get<any>('/accounting/api/v1/country', request)
  }
  public getRegionsParent(): Observable<any> {
    return this.get<any>('/accounting/api/v1/region', '')
  }

  public getRegionsByCountryId(request: string): Observable<any> {
    return this.get<any>('/accounting/api/v1/region/child/' + request, '')
  }

  public getLanguageKeys(request: string): Observable<any> {
    return this.get<any>('/main/api/v1/interface-language/interface' + request, '')
  }

  public getLanguageKeysForTrasnlate(request: string): Observable<any> {
    return this.get<any>('/main/api/v1/interface-language/translate' + request, '')
  }

  public getContractTypes() {
    return this.get<any>('/accounting/api/v1/contract-type', null)
  }

  public getPaymentTypesByContractTypeId(id: string) {
    return this.get<any>(`/accounting/api/v1/contract-type/structure/${id}`, null)
  }

}
