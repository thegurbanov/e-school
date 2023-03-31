import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ReportsComponent } from './reports/reports.component';
import { ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ConfigurationComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    NgSelectModule,
    ReactiveFormsModule
  ]
})
export class ReportModule { }
