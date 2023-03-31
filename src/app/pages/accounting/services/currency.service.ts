import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends BaseService {

  getList(): Observable<any> {
    return this.get<any>('/accounting/api/v1/currency', null)
  }

}
