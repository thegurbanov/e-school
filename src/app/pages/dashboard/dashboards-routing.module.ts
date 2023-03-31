import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from 'src/app/core/guards/auth.guard';
import {ChatComponent} from '../apps/chat/chat.component';
import {AuditComponent} from '../settings/audit/audit.component';
import {BranchRoomComponent} from './branch-room/branch-room.component';
import {BranchComponent} from './branch/branch.component';
import {CalendarDayComponent} from './calendar-day/calendar-day.component';
import {InterfaceLanguageComponent} from '../settings/interface-language/interface-language.component';
import {LessonHourComponent} from './lesson-hour/lesson-hour.component';
import {OrganizationsComponent} from './organizations/organizations.component';
import {CancelReasonComponent} from "./cancel-reason/cancel-reason.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'branches', component: OrganizationsComponent},
      {path: 'organizations', component: BranchComponent},
      {path: 'calendar-day', component: CalendarDayComponent},
      {path: 'lesson-hour', component: LessonHourComponent},
      {path: 'branch-room', component: BranchRoomComponent},
      {path: 'audit', component: AuditComponent},
      {path: 'chat', component: ChatComponent},
      {path: 'interface-language', component: InterfaceLanguageComponent},
      {path: 'cancel-reason', component: CancelReasonComponent}
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardsRoutingModule { }
