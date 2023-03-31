import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";
import {Observable} from "rxjs";
import {CustomerDto} from "../../../model/accounting/customer.dto";

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService {

  public getCustomers(): Observable<any> {
    return this.get<any>('/accounting/api/v1/customer', null)
  }

  public getCustomerById(id: string) {
    return this.get<any>(`/accounting/api/v1/customer/${id}`, null)
  }

  public addCustomer(customerDto: CustomerDto) {
    return this.post<any>('/accounting/api/v1/customer', customerDto)
  }

  public updateCustomer(customerDto: CustomerDto) {
    return this.put<any>('/accounting/api/v1/customer', customerDto)
  }

}
