import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseService {

  getInvoicesByContractId(contractId: string) {
    return this.get<any>(`/accounting/api/v1/invoice/contract/${contractId}`, null)
  }

}
