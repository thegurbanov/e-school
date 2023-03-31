import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class InterfaceLanguageService extends BaseService {
  public getBanks(request: any): Observable<any> {
    return this.get<any>('/main/api/v1/interface-language', request)
  }
  public getBankById(request: any): Observable<any> {
    return this.get<any>('/main/api/v1/interface-language/' + request, '')
  }
  public addBank(request: any): Observable<any> {
    return this.post<any>('/main/api/v1/interface-language', request)
  }
  public editBank(request: any): Observable<any> {
    return this.put<any>('/main/api/v1/interface-language', request)
  }
  public delBank(request: any): Observable<any> {
    return this.delete<any>('/main/api/v1/interface-language/' + request, '')
  }
}
