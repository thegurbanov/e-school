import {ContractPaymentOrderLineDto} from "./contractPaymentOrderLine.dto";
import {ContractPaymentTypeDto} from "./contractPaymentType.dto";
import {CurrencyDto} from "./currency.dto";

export interface ContractPaymentOrderDto {
  id: string,
  offerMonth: number,
  contractPaymentOrderLine: ContractPaymentOrderLineDto[],
  currency: CurrencyDto,
  initialAmount: number,
  paymentType: ContractPaymentTypeDto,
  totalAmount: number,
  totalBalance: number,
  totalCapital: number,
  totalInterest: number,
  totalPaymentAmount: number,
  totalPaymentPercent: number,
  totalDeptAmount: number,
  totalDeptPercent: number,
  lastPaymentAmount: number,
  lastPaymentDate: string,
  expireDate: string
  discount: number
  discountMonth: number
  loanPercent: number
  totalValue: number
}
