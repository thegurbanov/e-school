import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Directive({
  selector: '[roles]',
  inputs: ['roles']
})
export class RolesDirective {

  constructor(private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private userService: AuthenticationService) {
  }

  UserAccess = this.userService.getRole();
  @Input() set roles(allowedRole: string) {
    let shouldShow = false;
    if (allowedRole === this.UserAccess) {
      shouldShow = true;
    }
    if (shouldShow) {
      this._viewContainer.createEmbeddedView(this._templateRef);
    } else {
      this._viewContainer.clear();
    }
  }

}
