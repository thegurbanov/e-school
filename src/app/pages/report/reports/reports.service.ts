import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service'
import { Observable } from 'rxjs';
import { AppSettings } from '../../../config/app-config';

@Injectable({
    providedIn: 'root'
})
export class ReportsService extends BaseService {


    public getReports(request: any): Observable<any> {
        return this.get<any>('/file/api/v1/report', request)
    }

    public getReportById(request: any): Observable<any> {
        return this.get<any>('/file/api/v1/report/' + request, '')
    }

    public getReportFile(params: any) {

        let param = '';
        for (const key in params) {
            if (typeof params[key] === 'function') continue;
            if (typeof params[key] === 'undefined') continue;
            if (typeof params[key] === 'object') {
                let data = JSON.stringify(params[key]);
                if (data !== 'undefined') {
                    if (param?.length == 0) {
                        param += `?${key}=${encodeURI(JSON.stringify(params[key]))}`;
                    } else {
                        param += `&${key}=${encodeURI(JSON.stringify(params[key]))}`;
                    }
                }
            } else {
                if (param.length == 0) {
                    param += `?${key}=${encodeURI(params[key])}`;
                } else {
                    param += `&${key}=${encodeURI(params[key])}`;
                }
            }
        }
        return window.open(AppSettings.BASE_URL + '/file/report/pdf' + param);
    }


}
