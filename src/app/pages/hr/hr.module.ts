import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RelationalComponent } from './relational/relational.component';
import { ParentsComponent } from './parents/parents.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EmployeesComponent } from './employees/employees.component';
import { OrdersComponent } from './orders/orders.component';
import { ContractsComponent } from './contracts/contracts.component';
import { RegisterComponent } from './register/register.component';
import { EmployeeComponent } from './employee/employee.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerListComponent } from '../accounting/customer-list/customer-list.component';
import {DashboardsModule} from "../dashboard/dashboards.module";

@NgModule({
  declarations: [
    MainComponent,
    RelationalComponent,
    ParentsComponent,
    EmployeesComponent,
    OrdersComponent,
    ContractsComponent,
    RegisterComponent,
    EmployeeComponent,
    CustomerListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HrRoutingModule,
    NgbNavModule,
    NgSelectModule,
    ReactiveFormsModule,
    ImageCropperModule,
    PipesModule,
    DashboardsModule
  ]
})
export class HrModule { }
