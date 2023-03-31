import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";
import {PermissionEditDto} from "../../../model/settings/permissionEdit.dto";

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BaseService {

  getAll() {
    return this.get<any>('/security/permission/edit/findAll', null)
  }

  update(permission: PermissionEditDto) {
    return this.put<any>('/security/permission/edit', permission)
  }

}
