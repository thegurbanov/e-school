import {BinaDto} from "./bina.dto";
import {BinaBlockViewDto} from "./binaBlockView.dto";

export interface BinaViewDto {
  bina : BinaDto,
  blockList : BinaBlockViewDto []
}
