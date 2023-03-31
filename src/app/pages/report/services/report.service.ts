import {Injectable} from '@angular/core';
import {BaseService} from 'src/app/services/base/base.service';
import {ReportDto} from "../../../model/report/report.dto";

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService {

  getList() {
    return this.get<any>('/file/api/v1/report', null)
  }

  getById(id: string) {
    return this.get<any>(`/file/api/v1/report/${id}`, null)
  }

  add(report: ReportDto) {
    return this.post<any>('/file/api/v1/report', report)
  }

  update(report: ReportDto) {
    return this.put<any>('/file/api/v1/report', report)
  }

  deleteById(id: string) {
    return this.delete<any>(`/file/api/v1/report/${id}`, null)
  }

}
