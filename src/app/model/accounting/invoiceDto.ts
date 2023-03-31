import { CompanyDto } from "./company.dto";
import { ContractDto } from "./contract.dto";
import { ExpensesDto } from "./expensesDto";
import { ExpensesGroupDto } from "./expensesGroupDto";

export interface InvoiceDto {
    id: number,
    info: string,
    contract: ContractDto,
    expenses: ExpensesDto,
    company: CompanyDto,
    price: number;
    invoiceNumber: number;
    invoiceDate: string;
    amount: number;
    counts: number;
}
