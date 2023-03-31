import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { MainComponent } from './main/main.component';
import { OutlayComponent } from './outlay/outlay.component';
import { MerchandiseGroupComponent } from './merchandise-group/merchandise-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MerchandiseTypeComponent } from './merchandise-type/merchandise-type.component';
import { MerchandiseRegisterComponent } from './merchandise-register/merchandise-register.component';
import { WarehouseComponent } from './warehouse/warehouse.component';


@NgModule({
  declarations: [
    MainComponent,
    OutlayComponent,
    MerchandiseGroupComponent,
    WarehouseComponent,
    MerchandiseTypeComponent,
    MerchandiseRegisterComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    NgSelectModule

  ]
})
export class WarehouseModule { }
