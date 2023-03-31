import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service'
import { Observable } from 'rxjs';
import { ClassYearlyEducationPlan } from 'src/app/model/school/class.dto';
import { BaseResponse } from 'src/app/model/base.dto';

@Injectable({
    providedIn: 'root'
})
export class JournaListService extends BaseService {


    public getJournals(request: any): Observable<any> {
        return this.get<any>(`/school/api/v1/class-yearly-subject-teacher/yearly/${request.yearlyId}/week/${request.weekId}`, '')

    }
}
