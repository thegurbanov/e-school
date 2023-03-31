


import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExpensesService extends BaseService {


    public getExpensesGroupList(request: any): Observable<any> {
        return this.get<any>('/accounting/api/v1/expenses-group', request)
    }
    public getExpensesGroupById(request: any): Observable<any> {
        return this.get<any>('/accounting/api/v1/expenses-group/' + request, '')
    }

    public addExpensesGroup(request: any): Observable<any> {
        return this.post<any>('/accounting/api/v1/expenses-group', request)
    }

    public editExpensesGroup(request: any): Observable<any> {
        return this.put<any>('/accounting/api/v1/expenses-group', request)
    }

    public delExpensesGroup(request: any): Observable<any> {
        return this.delete<any>('/accounting/api/v1/expenses-group/' + request, '')
    }



    public getExpensesList(request: any): Observable<any> {
        return this.get<any>('/accounting/api/v1/expenses/group/' + request, '')
    }
    public getExpenseById(request: any): Observable<any> {
        return this.get<any>('/accounting/api/v1/expenses/' + request, '')
    }

    public addExpense(request: any): Observable<any> {
        return this.post<any>('/accounting/api/v1/expenses/', request)
    }

    public editExpense(request: any): Observable<any> {
        return this.put<any>('/accounting/api/v1/expenses', request)
    }

    public delExpense(request: any): Observable<any> {
        return this.delete<any>('/accounting/api/v1/expenses/' + request, '')
    }

}



