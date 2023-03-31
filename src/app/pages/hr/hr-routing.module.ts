import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {ParentsComponent} from './parents/parents.component';
import {RelationalComponent} from './relational/relational.component';
import {EmployeesComponent} from './employees/employees.component';
import {ContractsComponent} from './contracts/contracts.component';
import {OrdersComponent} from './orders/orders.component';
import {RegisterComponent} from './register/register.component';
import {EmployeeComponent} from './employee/employee.component';
import {RoleManagementComponent} from "./role-management/role-management.component";
import {DepartmentsComponent} from "./departments/departments.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {path: 'customer-relational', component: RelationalComponent},
  {path: 'customer-parent', component: ParentsComponent},
  {path: 'staff', component: EmployeesComponent},
  {path: 'newstaff', component: EmployeeComponent},
  {path: 'staff/:id', component: EmployeeComponent},
  {path: 'contracts', component: ContractsComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'role-management', component: RoleManagementComponent},
  {path: 'departments', component: DepartmentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
