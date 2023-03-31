import { Injectable } from '@angular/core';
import {BaseService} from "../../../services/base/base.service";
import {CommercialObjectAddDto, CommercialObjectDto} from "../../../model/construction/commercialObject.dto";

@Injectable({
  providedIn: 'root'
})
export class CommercialObjectService extends BaseService{

  getCommercialObjectList() {
    return this.get<any>('/construction/api/v1/comercial-object', null)
  }

  getCommercialObjectById(objectId: string) {
    return this.get<any>(`/construction/api/v1/comercial-object/${objectId}`, null)
  }

  addCommercialObject(object: CommercialObjectAddDto) {
    return this.post<any>('/construction/api/v1/comercial-object', object)
  }

  updateCommercialObject(object: CommercialObjectDto) {
    return this.put<any>('/construction/api/v1/comercial-object', object)
  }

  deleteCommercialObjectById(objectId: string) {
    return this.delete<any>(`/construction/api/v1/comercial-object/${objectId}`, null)
  }

}
