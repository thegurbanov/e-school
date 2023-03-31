import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";
import {Observable} from "rxjs";
import {BinaMenzilDto} from "../../../model/construction/binaMenzil.dto";

@Injectable({
  providedIn: 'root'
})
export class FlatService extends BaseService {

  public getFlatById(id: string): Observable<any> {
    return this.get<any>(`/construction/api/v1/bina-block-mertebe-menzil/${id}`, null)
  }

  public getApartmentsByBinaId(binaId: string) {
    return this.get<any>(`/construction/api/v1/bina/${binaId}`, null)
  }

  updateApartment(binaMenzilDto: BinaMenzilDto) {
    return this.post<any>(`/construction/api/v1/bina-block-mertebe-menzil`, binaMenzilDto)
  }
}
