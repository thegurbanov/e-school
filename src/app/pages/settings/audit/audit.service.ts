import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class BranchService extends BaseService {


    public getBranches(request: any): Observable<any> {
        return this.get<any>('/main/api/v1/branch', request)
    }


}
