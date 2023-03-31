import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class ContractTypeCategoryService extends BaseService {

  getList() {
    return this.get<any>('/accounting/api/v1/contract-type-category', null)
  }

}
