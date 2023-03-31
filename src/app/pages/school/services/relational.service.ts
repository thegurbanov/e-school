import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";
import {RelationalDto} from "../../../model/school/relational.dto";

@Injectable({
  providedIn: 'root'
})
export class RelationalService extends BaseService {

  getRelationalShipList() {
    return this.get<any>('/school/api/v1/relational-ship', null)
  }

  getRelationalShipById(relationalShipId: number) {
    return this.get<any>(`/school/api/v1/relational-ship/${relationalShipId}`, null)
  }

  addRelationalShip(relationalShip: RelationalDto) {
    return this.post<any>('/school/api/v1/relational-ship', relationalShip)
  }

  updateRelationalShip(relationalShip: RelationalDto) {
    return this.put<any>('/school/api/v1/relational-ship', relationalShip)
  }

  deleteRelationalShipById(relationalShipId: number) {
    return this.delete<any>(`/school/api/v1/relational-ship/${relationalShipId}`, null)
  }

}
