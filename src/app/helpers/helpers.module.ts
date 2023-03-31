import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesDirective } from '../directives/roles/roles.directive';



@NgModule({
  declarations: [
    RolesDirective
  ],
  exports: [
    RolesDirective
  ],
  imports: [
    CommonModule
  ]
})
export class HelpersModule { }
