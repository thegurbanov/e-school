import {ApartmentCommunalContractDto} from "./apartmentCommunalContract.dto";

export interface BinaMenzilViewDto {
  id: string,
  menzilNomre: string,
  nomre: number,
  sahe: number,
  otaqSay: number,
  mertebeId: string,
  mertebeNomre: number,
  blockId: string,
  blockNomre: number,
  note: string,
  total: number,
  oneTotal: number,
  discountTotal: number,
  discountTotalPercent: number,
  isSale: boolean,
  tip: number
  communalContracts?: ApartmentCommunalContractDto[]
}
