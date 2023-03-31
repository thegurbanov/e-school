import {BinaMenzilViewDto} from "./binaMenzilView.dto";
import {BinaBlockMertebeDto} from "./binaBlockMertebe.dto";

export interface BinaBlockMertebeViewDto {
  flatList: BinaMenzilViewDto[]
  floor: BinaBlockMertebeDto
}
