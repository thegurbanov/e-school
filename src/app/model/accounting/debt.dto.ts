import {ContractDto} from "./contract.dto";

export interface DebtDto {
  amount: number
  lineDate: string
  contract: ContractDto
  invoiceId: string
  invoiceNumber: string

  taxAmount: number
  taxRoadAmount: number
  totalAmount: number

  payTaxAmount: number
  payTaxRoadAmount: number
  totalPayAmount: number
  payAmount: number

  totalDebtAmount: number
  deptAmount: number
  debtTaxAmount: number
  debtTaxRoadAmount: number
}
