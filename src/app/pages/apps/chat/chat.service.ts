import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {


 public getAllUsers(): Observable<any> {
  return this.get<any>('/security/user/findAll', "")
}
public getMembersbyGroupId(request:any): Observable<any> {
  return this.get<any>('/security/chat/group/member'+request,"")
}
public sendMessage(request: any,data:any): Observable<any> {
  return this.post<any>('/security/chat/message/group/'+request, data)
}
public getMessagesByGroupId(request:any)
{
  return this.get<any>('/security/chat/message/group/'+request,"")

}
  public addChatToGroup(request: any): Observable<any> {
    return this.post<any>('/security/chat/group', request)
  }
  public addChatMemberToGroup(request: any): Observable<any> {
    return this.post<any>('/security/chat/group/member', request)
  }
  public getAllGroups(): Observable<any> {
    return this.get<any>('/security/chat/group',"")
  }
}
