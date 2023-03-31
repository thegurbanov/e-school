import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CountToModule } from 'angular-count-to';
import {NgbDropdownModule, NgbModule, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LightboxModule } from 'ngx-lightbox';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { SharedModule } from '../shared/shared.module';
import { WidgetModule } from '../shared/widget/widget.module';
import { AppsModule } from './apps/apps.module';
import { ChartModule } from './chart/chart.module';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { WarehouseModule } from './warehouse/warehouse.module';
import { PaginationComponent } from './core/pagination/pagination.component';
import { ExcelReaderComponent } from './core/excel-reader/excel-reader.component';
import { ExcelCreaterComponent } from './core/excel-creater/excel-creater.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PaginationComponent,
    ExcelReaderComponent,
    ExcelCreaterComponent,
  ],
    imports: [
        CommonModule,
        WidgetModule,
        CountToModule,
        SharedModule,
        NgApexchartsModule,
        PagesRoutingModule,
        SimplebarAngularModule,
        CarouselModule,
        RouterModule,
        NgbDropdownModule,
        NgbNavModule,
        AppsModule,
        LightboxModule,
        ChartModule,
        LeafletModule,
        WarehouseModule,
        NgbModule,
    ],
    exports: [
        PaginationComponent,
        ExcelReaderComponent,
        ExcelCreaterComponent
    ]
})
export class PagesModule { }
