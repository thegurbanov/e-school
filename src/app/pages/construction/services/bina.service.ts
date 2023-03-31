import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class BinaService extends BaseService {

  getAllBina() {
    return this.get<any>('/construction/api/v1/bina', null)
  }

  getBuildingById(buildingId: string) {
    return this.get<any>(`/construction/api/v1/bina/${buildingId}`, null)
  }

  getApartmentsByBinaId(binaId: string) {
    return this.get<any>(`/construction/api/v1/bina/apartments/${binaId}`, null)
  }

  getFlatsByFloorId(floorId: string) {
    return this.get<any>(`/construction/api/v1/bina/apartments/floor/${floorId}`, null)
  }

  addBuilding(building: any) {
    return this.post<any>('/construction/api/v1/bina', building)
  }

  deleteBuilding(buildingId: string) {
    return this.delete<any>(`/construction/api/v1/bina/apartments/floor/${buildingId}`, null)
  }

}
