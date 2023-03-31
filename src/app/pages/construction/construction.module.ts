import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConstructionRoutingModule} from './construction-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DislocationComponent} from './dislocation/dislocation.component';
import {RentalServiceComponent} from './rental-service/rental-service.component';
import {UtilitiesComponent} from './utilities/utilities.component';
import {SaledApartmentsComponent} from './saled-apartments/saled-apartments.component';
import {ApartmentsForSaleComponent} from './apartments-for-sale/apartments-for-sale.component';
import {SharedModule} from "../../shared/shared.module";
import {ApartmentDetailComponent} from './apartment-detail/apartment-detail.component';
import {GarageComponent} from './garage/garage.component';
import {CommercialObjectsComponent} from './commercial-objects/commercial-objects.component';
import {BuildingInfoComponent} from './building-info/building-info.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SimplebarAngularModule} from "simplebar-angular";
import {AccountingModule} from "../accounting/accounting.module";
import {ContractListComponent} from "./contract-list/contract-list.component";
import { CommunalViewComponent } from './communal-view/communal-view.component';
import {PagesModule} from "../pages.module";
import {PipesModule} from "../../pipes/pipes.module";
import { SetResidentalPipe } from './pipes/set-residential.pipe';


@NgModule({
  declarations: [
    DislocationComponent,
    RentalServiceComponent,
    UtilitiesComponent,
    SaledApartmentsComponent,
    ApartmentsForSaleComponent,
    ApartmentDetailComponent,
    GarageComponent,
    CommercialObjectsComponent,
    BuildingInfoComponent,
    ContractListComponent,
    CommunalViewComponent,
    SetResidentalPipe
  ],
    imports: [
        CommonModule,
        ConstructionRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        NgbModule,
        SimplebarAngularModule,
        AccountingModule,
        PagesModule,
        PipesModule
    ]
})
export class ConstructionModule { }
