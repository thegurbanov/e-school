import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BalanceReportComponent} from './balance-report/balance-report.component';
import {BankAccountsComponent} from './bank-accounts/bank-accounts.component';
import {BankComponent} from './bank/bank.component';
import {BenefitLossComponent} from './benefit-loss/benefit-loss.component';
import {CashboxElectronComponent} from './cashbox-electron/cashbox-electron.component';
import {CashboxComponent} from './cashbox/cashbox.component';
import {CompanyComponent} from './company/company.component';
import {CreditorComponent} from './creditor/creditor.component';
import {CurrencyComponent} from './currency/currency.component';
import {DebitorComponent} from './debitor/debitor.component';
import {PaymentForContractComponent} from "./payment-for-contract/payment-for-contract.component";
import {PaymentListComponent} from "./payment-list/payment-list.component";
import {ContractConfigComponent} from "./contract-config/contract-config.component";
import {ContractTemplateComponent} from "./contract-template/contract-template.component";
import {ContractListComponent} from "./contract-list-components/contract-list/contract-list.component";
import {ContractInfoComponent} from "./create-contract-components/contract-info/contract-info.component";
import {ContractDetailsComponent} from "./contract-list-components/contract-details/contract-details.component";
import {ExpensesComponent} from "./expenses/expenses.component";
import {ServiceBuyComponent} from "./service-buy/service-buy.component";
import {CustomerListComponent} from "./customer-list/customer-list.component";

const routes: Routes = [
  {path: 'creditor', component: CreditorComponent},
  {path: 'debitor', component: DebitorComponent},
  {path: 'cashbox', component: CashboxComponent},
  {path: 'cashbox-electron', component: CashboxElectronComponent},
  {path: 'currency', component: CurrencyComponent},
  {path: 'bank', component: BankComponent},
  {path: 'company', component: CompanyComponent},
  {path: 'balance-report', component: BalanceReportComponent},
  {path: 'benefit-loss', component: BenefitLossComponent},
  {path: 'bank_account', component: BankAccountsComponent},
  {path: 'payment-for-contract', component: PaymentForContractComponent},
  {path: 'payment-for-contract/:contractId', component: PaymentForContractComponent},
  {path: 'payment-for-contract/:contractId/:paymentAmount/:currencyId', component: PaymentForContractComponent},
  {path: 'payments', component: PaymentListComponent},
  {path: 'contract-config', component: ContractConfigComponent},
  {path: 'contract-template', component: ContractTemplateComponent},
  {path: 'contracts', component: ContractListComponent},
  {path: 'create-contract', component: ContractInfoComponent},
  {path: 'expenses', component: ExpensesComponent},
  {path: 'service-buy', component: ServiceBuyComponent},
  {path: 'create-contract/template/:templateId', component: ContractInfoComponent},
  {path: 'create-contract/category/:contractCategory', component: ContractInfoComponent},
  {path: 'create-contract/category/:contractCategory/template/:templateId', component: ContractInfoComponent},
  {
    path: 'create-contract/category/:contractCategory/contractType/:contractTypeId/predimet/:predimetId',
    component: ContractInfoComponent
  },
  {path: 'contracts/:contractId', component: ContractDetailsComponent},
  {path: 'customer', component: CustomerListComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
