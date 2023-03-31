import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";
import {ReportColumnDto} from "../../../model/report/reportColumn.dto";

@Injectable({
  providedIn: 'root'
})
export class ReportColumnService extends BaseService {

  getList() {
    return this.get<any>('/file/api/v1/report-column', null)
  }

  getById(id: string) {
    return this.get<any>(`/file/api/v1/report-column/${id}`, null)
  }

  add(reportColumn: ReportColumnDto) {
    return this.post<any>('/file/api/v1/report-column', reportColumn)
  }

  update(reportColumn: ReportColumnDto) {
    return this.put<any>('/file/api/v1/report-column', reportColumn)
  }

  deleteById(id: string) {
    return this.delete<any>(`/file/api/v1/report-column/${id}`, null)
  }

  getListByReportId(reportId: string) {
    return this.get<any>(`/file/api/v1/report-column/report/${reportId}`, null)
  }

}
