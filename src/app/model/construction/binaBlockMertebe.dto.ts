import {BinaBlockDto} from "./binaBlock.dto";

export interface BinaBlockMertebeDto{
  id: string,
  mertebeNomresi: number,
  menzilSay: number,
  sahe: number
  mertebeType: string

  binaBlock: BinaBlockDto
}
