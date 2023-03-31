import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CashboxesElectronService extends BaseService {

  public getAll(request: any): Observable<any> {
    return this.get<any>('/accounting/api/v1/kassa-electron', request)
  }
  public getById(request: any): Observable<any> {
    return this.get<any>('/accounting/api/v1/kassa-electron/' + request, '')
  }
  public add(request: any): Observable<any> {
    return this.post<any>('/accounting/api/v1/kassa-electron', request)
  }
  public edit(request: any): Observable<any> {
    return this.put<any>('/accounting/api/v1/kassa-electron', request)
  }
  public del(request: any): Observable<any> {
    return this.delete<any>('/accounting/api/v1/kassa-electron/' + request, '')
  }
}