import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseService} from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsForSaleService extends BaseService {

  public getBlocks(request: any): Observable<any> {
    return this.get<any>('/construction/api/v1/bina', request)
  }

  public getSellApartmentsByBinaId(request: any): Observable<any> {
    return this.get<any>('/construction/api/v1/bina-block-mertebe-menzil/sale/' + request, '')
  }

}
