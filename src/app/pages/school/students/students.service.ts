import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StudentsService extends BaseService {


    public getStudents(request: any): Observable<any> {
        return this.get<any>('/school/api/v1/customer', request)
    }

    // -----------------------------------------------------------------------------------------------------
    // @ get classes by year
    // -----------------------------------------------------------------------------------------------------
    public getClassesByYear(request: any): Observable<any> {
        return this.get<any>('/school/api/v1/class-yearly/year/' + request, '')
    }

    // -----------------------------------------------------------------------------------------------------
    // @ get years
    // -----------------------------------------------------------------------------------------------------
    public getYears(request: any): Observable<any> {
        return this.get<any>('/school/api/v1/yearly', request)
    }
    public getParentsByStudentId(request: any): Observable<any> {
        return this.get<any>('/school/api/v1/customer/parents/' + request, '')
    }

    public addParentsToStudent(request: any): Observable<any> {
        return this.post<any>('/school/api/v1/customer/parents/', request)
    }
    public delParentFromStudent(request: any): Observable<any> {
        return this.delete<any>('/school/api/v1/customer/parents/' + request, '')
    }

    public addStudent(request: any): Observable<any> {
        return this.post<any>('/school/api/v1/customer', request)
    }
    public editStudent(request: any): Observable<any> {
        return this.put<any>('/school/api/v1/customer', request)
    }


    public delStudent(request: any): Observable<any> {
        return this.delete<any>('/school/api/v1/customer/' + request, '')
    }

    // -----------------------------------------------------------------------------------------------------
    // @ get students by stutend
    // -----------------------------------------------------------------------------------------------------
    public getStudentById(request: any): Observable<any> {
        return this.get<any>('/school/api/v1/customer/' + request, '')
    }
    // -----------------------------------------------------------------------------------------------------
    // @ get students by classid
    // -----------------------------------------------------------------------------------------------------
    public getStudentsByClassId(request: any): Observable<any> {
        return this.get<any>('/school/api/v1/class-yearly-student/class-yearly/' + request, '')
    }

    // -----------------------------------------------------------------------------------------------------
    // @ get students by classid and subject
    // -----------------------------------------------------------------------------------------------------
    public getStudentsByClassIdandSubjectId(request: any): Observable<any> {
        return this.get<any>(`/school/api/v1/class-scheduler/student/${request.classID}/${request.subjectID}`, '')
    }

    // -----------------------------------------------------------------------------------------------------
    // @ move student to selected group
    // -----------------------------------------------------------------------------------------------------
    public moveStudentToGroup(request: any): Observable<any> {
        return this.post<any>(`/school/api/v1/class-scheduler/student`, request)
    }

    // -----------------------------------------------------------------------------------------------------
    // @ delete student from group 
    // -----------------------------------------------------------------------------------------------------
    public deleteStudentFromGroup(request: any): Observable<any> {
        return this.delete<any>(`/school/api/v1/class-scheduler/student/` + request, '')
    }

    // -----------------------------------------------------------------------------------------------------
    // @ add students to  selected class
    // -----------------------------------------------------------------------------------------------------
    public addStudentToCurrentClass(request: any): Observable<any> {
        return this.post<any>('/school/api/v1/class-yearly-student/', request,)
    }


    // -----------------------------------------------------------------------------------------------------
    // @ add students to  selected class
    // -----------------------------------------------------------------------------------------------------
    public deleteStudentToCurrentClass(request: any): Observable<any> {
        return this.delete<any>('/school/api/v1/class-yearly-student/' + request, '')
    }


}
