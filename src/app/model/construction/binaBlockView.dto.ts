import {BinaBlockDto} from "./binaBlock.dto";
import {BinaBlockMertebeViewDto} from "./binaBlockMertebeView.dto";

export interface BinaBlockViewDto {
  block: BinaBlockDto
  floorList: BinaBlockMertebeViewDto[]
}
