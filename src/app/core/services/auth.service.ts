import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base/base.service';
import { UserLoginRequest, User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {

    user!: User;
    currentUserValue: any;

    constructor(
        private client: BaseService,
        private router: Router
    ) { }


    async login(login: UserLoginRequest): Promise<UserLoginRequest> {

        console.log(login)
        const data: any = await this.client.post<UserLoginRequest>('/security/auth', login).toPromise();
        return data;
    }

    /**
     * Returns the current user
     */
    public currentUser(): any {
        return this.getAuthenticatedUser();
    }


    public getRole() {
        return this.getAuthenticatedUser().role
    }
    getAuthenticatedUser = () => {
        if (!localStorage.getItem('user')) {
            return null;
        }
        return JSON.parse(localStorage.getItem('user')!);
    }
    /**
     * Logout the user
     */
    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/account/login'
    }

    setLogin(res: any) {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.currentUserValue = res.user
    }

}

