import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DepartmentsComponent } from '../hr/departments/departments.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { BranchComponent } from './branch/branch.component';
import { LessonHourComponent } from './lesson-hour/lesson-hour.component';
import { CalendarDayComponent } from './calendar-day/calendar-day.component';
import { RoleManagementComponent } from '../hr/role-management/role-management.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { BranchRoomComponent } from './branch-room/branch-room.component';
import { AuditModule } from '../settings/audit/audit.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { InterfaceLanguageComponent } from '../settings/interface-language/interface-language.component';
import { TranslateModule } from '@ngx-translate/core';
import { CancelReasonComponent } from './cancel-reason/cancel-reason.component';
import { CustomerComponent } from '../accounting/customer/customer.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    DepartmentsComponent,
    OrganizationsComponent,
    BranchComponent,
    LessonHourComponent,
    CalendarDayComponent,
    RoleManagementComponent,
    BranchRoomComponent,
    InterfaceLanguageComponent,
    CancelReasonComponent,
    CustomerComponent,
  ],
  exports: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    NgApexchartsModule,
    SharedModule,
    FullCalendarModule,
    TranslateModule,
    PipesModule,
    AuditModule,
    Ng2SearchPipeModule
  ]
})
export class DashboardsModule { }
