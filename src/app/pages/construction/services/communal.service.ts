import { Injectable } from '@angular/core';
import {BaseService} from "../../../services/base/base.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunalService  extends BaseService{

  public getCommunalByBuildingIdAndYear(buildingId: string, year: number): Observable<any> {
    return this.get<any>(`/construction/api/v1/bina-block-mertebe-menzil/communal/${buildingId}/${year}`, null)
  }

}

