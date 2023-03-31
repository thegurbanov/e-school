import { Injectable } from '@angular/core';
import {BaseService} from "../../../services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class GenderService extends BaseService {

  getList() {
    return this.get<any>('/main/api/v1/gender', null)
  }

}
