import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class BranchRoomService extends BaseService {

  public getBranchrooms(request: any): Observable<any> {
    return this.get<any>('/main/api/v1/branch-room', request)
  }

  public addBranchroom(request: any): Observable<any> {
    return this.post<any>('/main/api/v1/branch-room', request)
  }
  public editBranchroom(request: any): Observable<any> {
    return this.put<any>('/main/api/v1/branch-room',request )
  }

  public delBranchroom(request: any): Observable<any> {
    return this.delete<any>('/main/api/v1/branch-room/'+request, '')
  }
  public getBranchroomById(request:any):Observable<any>
  {
    return this.get<any>('/main/api/v1/branch-room/'+request,'')
  }
}
