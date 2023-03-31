import { CustomerDto } from "../accounting/customer.dto";
import { ClassYearly } from "./class.dto";

export interface studentReportDto {
    id: string,
    classYearly: ClassYearly,
    customer: CustomerDto
}
