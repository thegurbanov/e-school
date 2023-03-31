import {BankDto} from "./bank.dto";
import {CurrencyDto} from "./currency.dto";

export interface BankAccountDto {
  id: string
  bank: BankDto
  bankAccount: string
  currency: CurrencyDto
}
