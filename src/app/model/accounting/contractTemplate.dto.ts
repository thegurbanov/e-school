import {ContractPaymentTypeDto} from "./contractPaymentType.dto";
import {CurrencyDto} from "./currency.dto";
import {ContractTypeDto} from "./contractType.dto";

export interface ContractTemplateDto {
  id: string
  info: string
  contractType: ContractTypeDto
  currency: CurrencyDto
  discountMonth: number
  initialAmount: number
  totalAmount: number
  offerMonth: number
  paymentType: ContractPaymentTypeDto
}
