import {CashboxDto} from "./cashbox.dto";
import {BankAccountDto} from "./bankAccount.dto";
import {CurrencyDto} from "./currency.dto";
import {ContractDto} from "./contract.dto";

export interface PaymentDto {
  id: string
  paymentDate: string
  paidType: string
  amount: number
  kassa: CashboxDto
  bankAccount: BankAccountDto,
  currency: CurrencyDto
  contract: ContractDto
}
