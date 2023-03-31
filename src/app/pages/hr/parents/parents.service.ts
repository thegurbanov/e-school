import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ParentsService extends BaseService {


    public getParents(request: any): Observable<any> {
        return this.get<any>('/school/api/v1/customer/parent', request)
    }
    public getParentById(request: any): Observable<any> {
        return this.get<any>('/school/api/v1/customer/parent/' + request, '')
    }
    public getStudentsByParentId(request: any): Observable<any> {
        return this.get<any>('/school/api/v1/customer/parent/childs/' + request, '')
    }

    public addParent(request: any): Observable<any> {
        return this.post<any>('/school/api/v1/customer/parent', request)
    }

    public addStudentToParent(request: any): Observable<any> {
        return this.post<any>('/school/api/v1/customer/parent', request)
    }

    public editParent(request: any): Observable<any> {
        return this.put<any>('/school/api/v1/customer/parent', request)
    }

    public delParent(request: any): Observable<any> {
        return this.delete<any>('/school/api/v1/customer/parent/' + request, '')
    }
    public delStudentFromParent(request: any): Observable<any> {
        return this.delete<any>('/school/api/v1/customer/parent/child/' + request, '')
    }


    public getRelations(request: any): Observable<any> {
        return this.get<any>('/school/api/v1/relational-ship', request)
    }


}
