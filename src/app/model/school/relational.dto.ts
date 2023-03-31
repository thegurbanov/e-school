import {GenderDto} from "../organization/gender.dto";

export interface RelationalDto {
  id: number
  info: string
  gender: GenderDto
}
