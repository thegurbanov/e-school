import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingRoutingModule } from './accounting-routing.module';
import { CreditorComponent } from './creditor/creditor.component';
import { DebitorComponent } from './debitor/debitor.component';
import { CashboxComponent } from './cashbox/cashbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyComponent } from './currency/currency.component';
import { BankComponent } from './bank/bank.component';
import { CompanyComponent } from './company/company.component';
import { BenefitLossComponent } from './benefit-loss/benefit-loss.component';
import { BalanceReportComponent } from './balance-report/balance-report.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { PaymentForContractComponent } from './payment-for-contract/payment-for-contract.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { CashboxElectronComponent } from './cashbox-electron/cashbox-electron.component';
import {SimplebarAngularModule} from "simplebar-angular";
import { ContractConfigComponent } from './contract-config/contract-config.component';
import { ContractTemplateComponent } from './contract-template/contract-template.component';
import {ContractDetailsComponent} from "./contract-list-components/contract-details/contract-details.component";
import {ContractListComponent} from "./contract-list-components/contract-list/contract-list.component";
import {ContractInfoComponent} from "./create-contract-components/contract-info/contract-info.component";
import {
  ContractListSpecialComponent
} from "./contract-list-components/contract-list-special/contract-list-special.component";
import {
  ApartmentSelectListComponent
} from "./create-contract-components/apartment-select-list/apartment-select-list.component";
import {
  CommercialObjectSelectListComponent
} from "./create-contract-components/commercial-object-select-list/commercial-object-select-list.component";
import {GarageSelectListComponent} from "./create-contract-components/garage-select-list/garage-select-list.component";
import {
  CustomerSelectListComponent
} from "./create-contract-components/customer-select-list/customer-select-list.component";
import { StudentSelectListComponent } from './create-contract-components/student-select-list/student-select-list.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ServiceBuyComponent } from './service-buy/service-buy.component';
import {NgbNavModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import { CompanySelectListComponent } from './create-contract-components/company-select-list/company-select-list.component';
import {PagesModule} from "../pages.module";
import {DashboardsModule} from "../dashboard/dashboards.module";


@NgModule({
  declarations: [
    CreditorComponent,
    DebitorComponent,
    CashboxComponent,
    CurrencyComponent,
    BankComponent,
    CompanyComponent,
    BenefitLossComponent,
    BalanceReportComponent,
    BankAccountsComponent,
    PaymentForContractComponent,
    PaymentListComponent,
    CashboxElectronComponent,
    ContractConfigComponent,
    ContractTemplateComponent,
    ContractDetailsComponent,
    ContractListComponent,
    ContractInfoComponent,
    ContractListSpecialComponent,
    ApartmentSelectListComponent,
    CommercialObjectSelectListComponent,
    GarageSelectListComponent,
    CustomerSelectListComponent,
    StudentSelectListComponent,
    ExpensesComponent,
    ServiceBuyComponent,
    CompanySelectListComponent,
  ],
  exports: [
    ContractListSpecialComponent,
    ContractDetailsComponent,
    CustomerSelectListComponent
  ],
  imports: [
    CommonModule,
    AccountingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    NgSelectModule,
    SimplebarAngularModule,
    NgbPaginationModule,
    PagesModule,
    DashboardsModule,
    NgbNavModule,
  ]
})
export class AccountingModule { }
