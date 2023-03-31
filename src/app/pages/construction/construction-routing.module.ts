import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApartmentsForSaleComponent} from './apartments-for-sale/apartments-for-sale.component';
import {DislocationComponent} from './dislocation/dislocation.component';
import {RentalServiceComponent} from './rental-service/rental-service.component';
import {SaledApartmentsComponent} from './saled-apartments/saled-apartments.component';
import {UtilitiesComponent} from './utilities/utilities.component';
import {ApartmentDetailComponent} from "./apartment-detail/apartment-detail.component";
import {GarageComponent} from "./garage/garage.component";
import {CommercialObjectsComponent} from "./commercial-objects/commercial-objects.component";
import {BuildingInfoComponent} from "./building-info/building-info.component";
import { ContractListComponent } from './contract-list/contract-list.component';
import {CommunalViewComponent} from "./communal-view/communal-view.component";

const routes: Routes = [
  {
    path: 'building',
    component: BuildingInfoComponent
  },
  {
    path: 'dislocation',
    component: DislocationComponent
  },
  {
    path: 'rental_service',
    component: RentalServiceComponent
  },
  {
    path: 'utilities',
    component: UtilitiesComponent
  },
  {
    path: 'saled_apartments',
    component: SaledApartmentsComponent
  },
  {
    path: 'apartments_for_sale',
    component: ApartmentsForSaleComponent
  },
  {
    path: 'garages',
    component: GarageComponent
  },
  {
    path: 'commercial_objects',
    component: CommercialObjectsComponent
  },
  {
    path: 'contracts',
    component: ContractListComponent
  },
  {
    path: 'communal',
    component: CommunalViewComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConstructionRoutingModule {
}
