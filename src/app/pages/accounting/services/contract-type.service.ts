import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class ContractTypeService extends BaseService {

  public getContractTypes() {
    return this.get<any>('/accounting/api/v1/contract-type', null)
  }

  public getContractTypeById(id: string) {
    return this.get<any>(`/accounting/api/v1/contract-type/${id}`, null)
  }

  public getPaymentTypesByContractTypeId(id: string) {
    return this.get<any>(`/accounting/api/v1/contract-type/structure/${id}`, null)
  }

  getContractTypesByContractCategory(category: string) {
    return this.get<any>(`/accounting/api/v1/contract-type/category/${category}`, null)
  }

}
