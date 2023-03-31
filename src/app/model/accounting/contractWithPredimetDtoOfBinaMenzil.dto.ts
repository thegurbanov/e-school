import {ContractDto} from "./contract.dto";
import {BinaMenzilDto} from "../construction/binaMenzil.dto";

export interface ContractWithPredimetDtoOfBinaMenzilDto {
  contract: ContractDto,
  predmet: BinaMenzilDto
}
