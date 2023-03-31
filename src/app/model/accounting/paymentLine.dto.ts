import {PaymentDto} from "./payment.dto";

export interface PaymentLineDto {
  id: string
  payment: PaymentDto
  lineAmount: number
  paymentLine: number
  contractLineId: string
}
