import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuditComponent} from "./audit/audit.component";
import {InterfaceLanguageComponent} from "./interface-language/interface-language.component";
import {PermissionsEditComponent} from "./permissions-edit/permissions-edit.component";

const routes: Routes = [
  {path: 'audit', component: AuditComponent},
  {path: 'interface-language', component: InterfaceLanguageComponent},
  {path: 'permissions-edit', component: PermissionsEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
