import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService extends BaseService {

  public getWarehouses(request: any): Observable<any> {
    return this.get<any>('/warehouse/api/v1/warehouse', request)
  }
  public getWarehouseById(request: any): Observable<any> {
    return this.get<any>('/warehouse/api/v1/warehouse/'+request,'')
  }


  public addWarehouse(request: any): Observable<any> {
    return this.post<any>('/warehouse/api/v1/warehouse', request)
  }
  public editWarehouse(request: any): Observable<any> {
    return this.put<any>('/warehouse/api/v1/warehouse',request )
  }

  public delWarehouse(request: any): Observable<any> {
    return this.delete<any>('/warehouse/api/v1/warehouse/'+request,'')
  }

}
