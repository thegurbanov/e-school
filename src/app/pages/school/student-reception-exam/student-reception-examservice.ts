import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StudentsReceptionExamService extends BaseService {

    public getExams(request: any): Observable<any> {
        return this.get<any>('/school/api/v1/student-reseption-exam/teacher', request)
    }

    public updateExam(request: any): Observable<any> {
        return this.put<any>('/school/api/v1/student-reseption-exam/teacher', request)
    }

    public getExamById(request: any): Observable<any> {
        return this.get<any>('/school/api/v1/student-reseption-exam/' + request, '')
    }

}
