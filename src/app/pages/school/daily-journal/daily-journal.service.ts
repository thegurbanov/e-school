import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DailyJournalService extends BaseService {


    public getJournalData(request: any): Observable<any> {
        return this.get<any>('/school/api/v1/class-yearly-lesson/class-yearly/lesson/daily', request)
    }


    // http://btk.ddns.net:7777/school/api/v1/class-yearly-lesson/class-yearly/lesson/daily?date=10.05.2022

}
