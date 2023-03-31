import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";
import {GarageAddDto, GarageDto} from "../../../model/construction/garage.dto";

@Injectable({
  providedIn: 'root'
})
export class GarageService extends BaseService {

  getGarageList() {
    return this.get<any>('/construction/api/v1/garage', null)
  }

  getGarageById(garageId: string) {
    return this.get<any>(`/construction/api/v1/garage/${garageId}`, null)
  }

  addGarage(garage: GarageAddDto) {
    return this.post<any>('/construction/api/v1/garage', garage)
  }

  updateGarage(garage: GarageDto) {
    return this.put<any>('/construction/api/v1/garage', garage)
  }

  deleteGarageById(garageId: string) {
    return this.delete<any>(`/construction/api/v1/garage/${garageId}`, null)
  }

}
