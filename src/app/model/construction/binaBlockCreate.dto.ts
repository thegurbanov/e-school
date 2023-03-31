import {BinaMenzilStructureCreateDto} from "./binaMenzilStructureCreate.dto";

export interface BinaBlockCreateDto {
  evSay: number,
  nomre: number,
  structures: BinaMenzilStructureCreateDto []
}
