import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {SettingsRoutingModule} from './settings-routing.module';
import { PermissionsEditComponent } from './permissions-edit/permissions-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../../pipes/pipes.module";


@NgModule({
  declarations: [
    PermissionsEditComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule
  ],
  providers: [DatePipe]
})
export class SettingsModule {
}
