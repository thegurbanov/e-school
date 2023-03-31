import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class MerchandiseRegisterService extends BaseService {

  public getMerchandiseRegisters(request: any): Observable<any> {
    return this.get<any>('/warehouse/api/v1/warehouse_merchandise', request)
  }
  public getMerchandiseRegisterById(request: any): Observable<any> {
    return this.get<any>('/warehouse/api/v1/warehouse_merchandise/' + request, '')
  }
  public addMerchandiseRegister(request: any): Observable<any> {
    return this.post<any>('/warehouse/api/v1/warehouse_merchandise', request)
  }
  public editMerchandiseRegister(request: any): Observable<any> {
    return this.put<any>('/warehouse/api/v1/warehouse_merchandise', request)
  }
  public delMerchandiseRegister(request: any): Observable<any> {
    return this.delete<any>('/warehouse/api/v1/warehouse_merchandise/' + request, '')
  }
}
