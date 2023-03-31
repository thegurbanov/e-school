import {Injectable} from '@angular/core';
import {BaseService} from 'src/app/services/base/base.service'
import {Observable} from 'rxjs';
import {ClassYearlyEducationPlan} from 'src/app/model/school/class.dto';
import {BaseResponse} from 'src/app/model/base.dto';

@Injectable({
  providedIn: 'root'
})
export class PlansService extends BaseService {


  public getPlansByYear(request: any): Observable<any> {
    return this.get<any>('/school/api/v1/class-yearly-education-plan/year/' + request, '')
  }

  public getPlanById(request: any) {
    return this.get<BaseResponse<ClassYearlyEducationPlan>>('/school/api/v1/class-yearly-education-plan/' + request, '')
  }

  public getPlanByClassIdAndWeekId(classId: any, weekId: string) {
    return this.get<BaseResponse<ClassYearlyEducationPlan>>(`/school/api/v1/class-yearly-education-plan/class-yearly/${classId}/week/${weekId}`, '')
  }

  public addPlan(request: any): Observable<any> {
    return this.post<any>('/school/api/v1/class-yearly-education-plan', request)
  }

  public editPlan(request: any): Observable<any> {
    return this.put<any>('/school/api/v1/class-yearly-education-plan/', request)
  }

  public delPlan(request: any): Observable<any> {
    return this.delete<any>('/school/api/v1/class-yearly-education-plan/' + request, '')
  }

}
