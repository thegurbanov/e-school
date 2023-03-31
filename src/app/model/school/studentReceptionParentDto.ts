import {RelationalShip} from "./class.dto";
import {GenderDto} from "../organization/gender.dto";

export interface studentReceptionParentDto {
  id: string,
  firstName: string,
  secondName: string,
  relational: RelationalShip,
  gender: GenderDto
}
