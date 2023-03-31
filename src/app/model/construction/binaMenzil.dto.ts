import {BinaBlockMertebeDto} from "./binaBlockMertebe.dto";

export interface BinaMenzilDto {
  id: string,
  binaMertebe: BinaBlockMertebeDto,
  discountTotal: number,
  discountTotalPercent: number,
  isSale: number,
  menzilNomre: string,
  note: string,
  oneTotal: number,
  owner: string,
  repairEndDate: string,
  repairStartDate: string,
  repairType: number,
  tip: number,
  total: number,
  sahe: number,
  otaqSay: number
  mertebeNomre: number;
}
