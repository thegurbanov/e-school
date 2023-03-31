import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
    providedIn: 'root',
})
export class RoleManagementService extends BaseService {
    public getRoles(request: string): Observable<any> {
        return this.get<any>('/security/user/role/findAll', request);
    }

    public getUsers(request: string): Observable<any> {
        return this.get<any>('/security/user/findAll', request);
    }

    public createUser(request: any): Observable<any> {
        return this.post<any>('/security/user', request);
    }
    public editUser(request: any): Observable<any> {

        return this.put<any>('/security/user', request);
    }

    public changePass(request: any): Observable<any> {
        return this.put<any>('/security/user/password', request);
    }

    public getPermissions(request: any): Observable<any> {
        return this.get<any>(`/security/user/permission/${request.username}/findAll`, '');
    }

    public sendPermissions(username: string, request: any): Observable<any> {
        return this.put<any>(`/security/user/permission/${username}`, request);
    }
}
