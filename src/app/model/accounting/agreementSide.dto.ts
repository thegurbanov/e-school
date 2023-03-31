import {CompanyDto} from "./company.dto";
import {CustomerDto} from "./customer.dto";

export interface AgreementSideDto {
  id: string,
  agreementSideType: string,
  company: CompanyDto,
  customer: CustomerDto,
  phone1: string,
  phone2: string,
  fax1: string,
  fax2: string,
  mob1Prefix: string,
  mob1: string,
  mob2Prefix: string,
  mob2: string
}
