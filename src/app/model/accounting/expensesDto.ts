import { ExpensesGroupDto } from "./expensesGroupDto";

export interface ExpensesDto {
    id: number,
    info: string,
    qrup: ExpensesGroupDto
}
