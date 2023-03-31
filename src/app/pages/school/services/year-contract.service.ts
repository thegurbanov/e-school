import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class YearContractService extends BaseService {

  add(classYearContract: any) {
    return this.post<any>('/school/api/v1/year-contract', classYearContract)
  }

}
