import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";
import {CancelReasonDto} from "../../../model/organization/cancelReason.dto";

@Injectable({
  providedIn: 'root'
})
export class CancelReasonService extends BaseService {

  getCancelReasonList() {
    return this.get<any>('/main/api/v1/cancel-reason', null)
  }

  getcCncelReasonById(cancelReasonId: string) {
    return this.get<any>(`/main/api/v1/cancel-reason/${cancelReasonId}`, null)
  }

  addCancelReason(cancelReason: CancelReasonDto) {
    return this.post<any>('/main/api/v1/cancel-reason', cancelReason)
  }

  updateCancelReason(cancelReason: CancelReasonDto) {
    return this.put<any>('/main/api/v1/cancel-reason', cancelReason)
  }

  deleteCancelReasonById(cancelReasonId: string) {
    return this.delete<any>(`/main/api/v1/cancel-reason/${cancelReasonId}`, null)
  }

}
