import {ContractPaymentOrderLinePaymentDto} from "./contractPaymentOrderLinePayment.dto";

export interface ContractPaymentOrderLineDto {
  id: string,
  amount: number,
  balance: number,
  capital: number,
  interest: number,
  line: number,
  lineDate: string,
  debt: number
  payments: ContractPaymentOrderLinePaymentDto[]
  editable: boolean
}
