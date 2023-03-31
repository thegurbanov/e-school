import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class MerchandiseTypeService extends BaseService {

  public getMerchandiseTypes(request: any): Observable<any> {
    return this.get<any>('/warehouse/api/v1/warehouse-merchandise-tip', request)
  }
  public getMerchandiseTypeById(request: any): Observable<any> {
    return this.get<any>('/warehouse/api/v1/warehouse-merchandise-tip/' + request, '')
  }
  public addMerchandiseType(request: any): Observable<any> {
    return this.post<any>('/warehouse/api/v1/warehouse-merchandise-tip', request)
  }
  public editMerchandiseType(request: any): Observable<any> {
    return this.put<any>('/warehouse/api/v1/warehouse-merchandise-tip', request)
  }
  public delMerchandiseType(request: any): Observable<any> {
    return this.delete<any>('/warehouse/api/v1/warehouse-merchandise-tip/' + request, '')
  }

}
