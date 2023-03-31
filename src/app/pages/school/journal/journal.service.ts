import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class JournalService extends BaseService {

    public getLessonDetail(request: any): Observable<any> {
        return this.get<any>(`/school/api/v1/class-yearly-lesson/class-yearly/journal/${request.msubjectID}`, '')
    }

    public getLessonDetailFromJournalList(request: any): Observable<any> {
        return this.get<any>(`/school/api/v1/class-yearly-lesson/class-yearly/${request.classID}/subject/${request.subjectID}/teacher/${request.teacherID}/journal?month=${request.monthID}`, '')
    }

    public getMonths(request: any): Observable<any> {
        return this.get<any>(`/school/api/v1/class-yearly-lesson/class-yearly/${request}/journal/month`, '')
    }

    public giveNote(request: any): Observable<any> {
        return this.post<any>('/school/api/v1/class-yearly-lesson/class-yearly/mark', request)
    }

    public getTopics(request: any): Observable<any> {
        return this.get<any>(`/school/api/v1/class-yearly-education-program/class-yearly/${request.classID}/subject/${request.subjectID}`, '')
    }
    public addTopic(request: any): Observable<any> {
        return this.put<any>('/school/api/v1/class-yearly-lesson/class-yearly/program', request)
    }

    public getPrograms(request: any): Observable<any> {
        return this.get<any>(`/school/api/v1/class-yearly-lesson/class-yearly/${request.classID}/subject/${request.subjectID}/teacher/${request.teacherID}/program?month=${request.monthID}`, '')
    }
    public delProgram(request: any): Observable<any> {
        return this.delete<any>(`/school/api/v1/class-yearly-lesson/class-yearly/program/${request}`, '')
    }
    public getMarkContents(request: any): Observable<any> {
        return this.get<any>(`/school/api/v1/subject-mark-content/section/${request.classSectionId}/subject/${request.subjectId}`, '')
    }

}
