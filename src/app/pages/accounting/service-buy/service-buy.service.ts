import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ServiceBuyService extends BaseService {


    public getInvoices(request: any): Observable<any> {
        return this.get<any>('/accounting/api/v1/invoice', request)
    }

    public getInvoiceById(request: any): Observable<any> {
        return this.get<any>('/accounting/api/v1/invoice/' + request, '')
    }

    public addInvoice(request: any): Observable<any> {
        return this.post<any>('/accounting/api/v1/invoice', request)
    }

    public editInvoice(request: any): Observable<any> {
        return this.put<any>('/accounting/api/v1/invoice', request)
    }






}
