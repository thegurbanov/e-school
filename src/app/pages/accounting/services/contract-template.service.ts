import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";
import {ContractTemplateDto} from "../../../model/accounting/contractTemplate.dto";

@Injectable({
  providedIn: 'root'
})
export class ContractTemplateService extends BaseService {

  add(contractTemplate: ContractTemplateDto) {
    return this.post<any>('/accounting/api/v1/contract-template', contractTemplate)
  }

  getList() {
    return this.get<any>('/accounting/api/v1/contract-template', null)
  }

  getContractTemplateById(id: string) {
    return this.get<any>(`/accounting/api/v1/contract-template/${id}`, null)
  }

  deleteContractTemplateById(id: string) {
    return this.delete<any>(`/accounting/api/v1/contract-template/${id}`, null)
  }

  updateContractTemplate(contractTemplate: ContractTemplateDto) {
    return this.put<any>('/accounting/api/v1/contract-template', contractTemplate)
  }

  getContractTemplateListByCategory(category: string) {
    return this.get<any>(`/accounting/api/v1/contract-template/category/${category}`, null)
  }

}
