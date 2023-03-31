import {BinaBlockCreateDto} from "./binaBlockCreate.dto";

export interface BinaCreateDto {
  address: string,
  blocks: BinaBlockCreateDto [],
  info: string,
  mertebeSay: number,
  poct: string,
  yasayisMertebeStart: number
}
