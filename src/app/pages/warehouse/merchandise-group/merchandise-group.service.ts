import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class MerchandiseGroupService extends BaseService {

  public getMerchandisegroups(request: any): Observable<any> {
    return this.get<any>('/warehouse/api/v1/warehouse-merchandise-group', request)
  }

  public addMerchandise(request: any): Observable<any> {
    return this.post<any>('/warehouse/api/v1/warehouse-merchandise-group', request)
  }
  public editMerchandise(request: any): Observable<any> {
    return this.put<any>('/warehouse/api/v1/warehouse-merchandise-group',request )
  }

  public delMerchandise(request: any): Observable<any> {
    return this.delete<any>('/warehouse/api/v1/warehouse-merchandise-group/'+request, '')
  }
  public getMerchandiseById(request:any):Observable<any>
  {
    return this.get<any>('/warehouse/api/v1/warehouse-merchandise-group/'+request,'')
  }
  ///////////Parent Merchandise APIs
  public getMerchandisesByParent(request:any):Observable<any>
  {
    return this.get<any>('/warehouse/api/v1/warehouse-merchandise-group/parent/'+request,'')
  }
  public addMerchandiseToParent(id:any,request:any):Observable<any>
  {
    return this.post<any>('/warehouse/api/v1/warehouse-merchandise-group/parent/'+id,request)
  }

  public delParentMerchandise(request: any): Observable<any> {
    return this.delete<any>('/warehouse/api/v1/warehouse-merchandise-group/child/'+request, '')
  }
  public editParentMerchandise(id:any,request: any): Observable<any> {
    return this.put<any>('/warehouse/api/v1/warehouse-merchandise-group/parent/'+id, request)
  }
}
