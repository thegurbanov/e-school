import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class CreditorService extends BaseService {

  getDebitorListByContract() {
    return this.get<any>('/accounting/api/v1/debt/credit/contract', null)
  }

  getDebitorListByInvoice() {
    return this.get<any>('/accounting/api/v1/debt/credit/invoice', null)
  }

}
