import {Injectable} from '@angular/core';
import {BaseService} from '../base/base.service'
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GeneralService extends BaseService {


  public getUserDetail(request: any): Observable<any> {
    return this.get<any>('/user/api/currentUser?mac=web&version=1.0', request)
  }


}
