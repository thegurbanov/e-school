import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class AdditionalLessonService extends BaseService {

  getListByYearId(yearId:string) {
    return this.get<any>(`/school/api/v1/additional_lesson/year/${yearId}`, null)
  }

  add(body: any) {
    return this.post<any>('/school/api/v1/additional_lesson', body)
  }

  getById(id: string) {
    return this.get<any>(`/school/api/v1/additional_lesson/${id}`, null)
  }

  deleteById(id: string) {
    return this.delete<any>(`/school/api/v1/additional_lesson/${id}`, null)
  }

}
