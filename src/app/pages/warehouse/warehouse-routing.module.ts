import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MerchandiseGroupComponent } from './merchandise-group/merchandise-group.component';
import { MerchandiseRegisterComponent } from './merchandise-register/merchandise-register.component';
import { MerchandiseTypeComponent } from './merchandise-type/merchandise-type.component';
import { OutlayComponent } from './outlay/outlay.component';
import { WarehouseComponent } from './warehouse/warehouse.component';

const routes: Routes = [
  {
    path: 'main',
    component: WarehouseComponent
  },
  {
    path: 'outlay',
    component: OutlayComponent
  },
  {
    path: 'merchandise-group',
    component: MerchandiseGroupComponent
  },
  {
    path: 'merchandise-type',
    component: MerchandiseTypeComponent
  },
  {
    path: 'merchandise-register',
    component:MerchandiseRegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
