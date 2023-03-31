import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule), canActivate: [AuthGuard]
  },
  {
    path: 'chart', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule), canActivate: [AuthGuard]
  },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboards.module').then(m => m.DashboardsModule), canActivate: [AuthGuard] },
  { path: 'hr', loadChildren: () => import('./hr/hr.module').then(m => m.HrModule), canActivate: [AuthGuard] },
  { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule), canActivate: [AuthGuard] },
  { path: 'school', loadChildren: () => import('./school/school.module').then(m => m.SchoolModule), canActivate: [AuthGuard] },
  { path: 'warehouse', loadChildren: () => import('./warehouse/warehouse.module').then(m => m.WarehouseModule), canActivate: [AuthGuard] },
  { path: 'accounting', loadChildren: () => import('./accounting/accounting.module').then((m) => m.AccountingModule), canActivate: [AuthGuard] },
  { path: 'construction', loadChildren: () => import('./construction/construction.module').then((m) => m.ConstructionModule), canActivate: [AuthGuard] },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
