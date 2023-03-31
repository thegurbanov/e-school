import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService extends BaseService {

  public getBlocks(request: any): Observable<any> {
    return this.get<any>('/construction/api/v1/bina', request)
  }
}
