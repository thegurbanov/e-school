import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class ContractAgreementSideTypeService extends BaseService {

  getList() {
    return this.get<any>('/accounting/api/v1/contract-agreement-side-type', null)
  }

}
