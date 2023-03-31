
import {CustomerDocumentDto} from "./customerDocument.dto";
import {GenderDto} from "../organization/gender.dto";

export interface CustomerDto {
  id: string,
  firstName: string,
  secondName: string,
  fullName: string,
  matherName: string,
  fatherName: string,
  gender: GenderDto,
  customerDocument: CustomerDocumentDto
  dob: string
}
