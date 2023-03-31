import {AgreementSideDto} from "./agreementSide.dto";
import {ContractPaymentOrderDto} from "./contractPaymentOrder.dto";
import {ContractPredimetDto} from "./contractPredimet.dto";
import {ContractTypeDto} from "./contractType.dto";

export interface ContractDto {
  id: string,
  contractNumber : string,
  agreementSide: AgreementSideDto,
  contractPaymentOrder: ContractPaymentOrderDto,
  contractPredimet: ContractPredimetDto,
  contractType: ContractTypeDto,
  createdDate: string,
  info: string,
  contractDate: string
}
