import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";
import {Observable} from "rxjs";
import {GenericSearchDto} from "../../../model/accounting/genericSearch.dto";

@Injectable({
  providedIn: 'root'
})
export class ContractService extends BaseService {

  postContract(contract: any): Observable<any> {
    return this.post<any>('/accounting/api/v1/contract/sign-contract', contract)
  }

  calculateContractInfo(calculatorInfo: any) {
    return this.post<any>('/accounting/api/v1/contract/calculator', calculatorInfo)
  }

  getContractByApartmentId(apartmentId: string) {
    return this.get<any>(`/accounting/api/v1/contract/sign-contract/apartment/${apartmentId}`, null)
  }

  getAllContracts() {
    return this.get<any>(`/accounting/api/v1/contract/all`, null)
  }

  getContractById(contractId: string) {
    return this.get<any>(`/accounting/api/v1/contract/${contractId}`, null)
  }

  getContractsByContractType(contractType: string) {
    let url = `/construction/api/v1/contract/all?contractType=${contractType}`
    if (contractType === '') {
      url = `/construction/api/v1/contract/all`
    }
    return this.get<any>(url, null)
  }

  getContractsByConsenTypeAndConsentId(consentType: string, consentId: string) {
    return this.get<any>(`/accounting/api/v1/contract/consent/${consentType}/${consentId}`, null)
  }

  getContractsByPredmetTypeAndPredmetId(predmetType: string, predmetId: string) {
    return this.get<any>(`/accounting/api/v1/contract/predimet/${predmetType}/${predmetId}`, null)
  }

  getContractInvoices(contractId: string) {
    return this.get<any>(`/accounting/api/v1/contract/invoices/${contractId}`, null)
  }

  search(genericSearchDto: GenericSearchDto, pageSize: number, pageNumber: number, sort: string, isDesc: boolean) {
    let url: string = `/accounting/api/v1/contract/search?page=${pageNumber}&size=${pageSize}`

    if (sort) {
      url += `&sort=${sort}`
    }

    if (isDesc === true) {
      url += '%2Cdesc'
    }

    return this.post<any>(url, genericSearchDto)
  }
}
