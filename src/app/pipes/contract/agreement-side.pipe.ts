import {Pipe, PipeTransform} from '@angular/core';
import {ContractDto} from "../../model/accounting/contract.dto";

@Pipe({
  name: 'agreementSide'
})
export class AgreementSidePipe implements PipeTransform {

  transform(contract?: ContractDto): string {

    if (!contract) return ''

    if (contract.agreementSide.company) {
      return contract.agreementSide.company.info
    }

    if (contract.agreementSide.customer) {
      return contract.agreementSide.customer.fullName
    }

    return ''
  }

}
