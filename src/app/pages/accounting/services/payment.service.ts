import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";
import {PaymentInitialInfoDto} from "../../../model/accounting/paymentInitialInfo.dto";
import {GenericSearchDto} from "../../../model/accounting/genericSearch.dto";

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService {

  add(paymentDto: PaymentInitialInfoDto) {
    return this.post<any>('/accounting/api/v1/payments', paymentDto)
  }

  search(genericSearchDto: GenericSearchDto, pageSize: number, pageNumber: number, sort: string, isDesc: boolean) {
    let url: string = `/accounting/api/v1/payments/search?page=${pageNumber}&size=${pageSize}`

    if (sort) {
      url += `&sort=${sort}`
    }

    if (isDesc === true) {
      url += '%2Cdesc'
    }

    return this.post<any>(url, genericSearchDto)
  }

  searchByCashBox(genericSearchDto: GenericSearchDto, pageSize: number, pageNumber: number, sort: string, isDesc: boolean) {
    let url: string = `/accounting/api/v1/payments/search/cash?page=${pageNumber}&size=${pageSize}`

    if (sort) {
      url += `&sort=${sort}`
    }

    if (isDesc === true) {
      url += '%2Cdesc'
    }

    return this.post<any>(url, genericSearchDto)
  }

  searchByBank(genericSearchDto: GenericSearchDto, pageSize: number, pageNumber: number, sort: string, isDesc: boolean) {
    let url: string = `/accounting/api/v1/payments/search/bank?page=${pageNumber}&size=${pageSize}`

    if (sort) {
      url += `&sort=${sort}`
    }

    if (isDesc === true) {
      url += '%2Cdesc'
    }

    return this.post<any>(url, genericSearchDto)
  }

}
