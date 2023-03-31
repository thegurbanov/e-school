import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TimelineService extends BaseService {

    public getWeeks(request: any): Observable<any> {
        return this.get<any>('/school/api/v1/week/year/' + request, '')
    }

    getDaysbyWeekId(request: any): Observable<any> {
        return this.get<any>(`/school/api/v1/week/${request}/days`, '')
    }

    getLessonByDay(request: any): Observable<any> {
        return this.get<any>(`/school/api/v1/class-scheduler`, request)
    }
    getLessonOfCurrentDay(request: any): Observable<any> {
        return this.get<any>(`/school/api/v1/class-scheduler/classYear/${request.class}/week/${request.week}`, '')
    }

    addNewSubjectAndTeacherToLesson(request: any): Observable<any> {
        return this.post<any>(`/school/api/v1/class-scheduler`, request)
    }
    editLesson(request: any): Observable<any> {
        return this.put<any>(`/school/api/v1/class-scheduler`, request)
    }
    delLesson(request: any) {
        return this.delete<any>(`/school/api/v1/class-scheduler/all/` + request, '')
    }
    delSubject(request: any) {
        return this.delete<any>(`/school/api/v1/class-scheduler/` + request, '')
    }

    getChildren(request: any) {
        return this.get<any>(`/school/api/v1/student/`, request)
    }

    getLessonByCustomerID(request: any) {
        return this.get<any>(`/school/api/v1/student/timetable/${request.customerId}/${request.yearlyId}/?month=${request.month}`, '')
    }

}
