import {Component, Input, OnInit} from '@angular/core';
import {ContractDto} from "../../../../model/accounting/contract.dto";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ContractService} from "../../services/contract.service";

@Component({
  selector: 'app-contract-list-special',
  templateUrl: './contract-list-special.component.html',
  styleUrls: ['./contract-list-special.component.scss']
})
export class ContractListSpecialComponent implements OnInit {

  @Input() consentId!: string
  @Input() consentType!: string
  @Input() predmetId!: string
  @Input() predmetType!: string

  selectedContract!: ContractDto
  contractList: ContractDto[] = []

  constructor(private modalService: NgbModal,
              private contractService: ContractService) {
  }

  ngOnInit(): void {
    if (this.consentId && this.consentType) {
      this.getContractsByConsentIdAndConsentType()
      return
    }

    if (this.predmetType && this.predmetId) {
      this.getContractsByPredmetTypeAndPredmetId()
      return
    }
  }

  scrollModal(scrollDataModal: any, contract: ContractDto) {
    this.selectedContract = contract
    this.modalService.open(scrollDataModal, {scrollable: true, size: "xl"});
  }

  getContractsByConsentIdAndConsentType() {
    this.contractService.getContractsByConsenTypeAndConsentId(this.consentType, this.consentId).toPromise().then(success => {
      if (success?.code === "200") {
        this.contractList = success?.result
      }
    })
  }

  getContractsByPredmetTypeAndPredmetId() {
    this.contractService.getContractsByPredmetTypeAndPredmetId(this.predmetType, this.predmetId).toPromise().then(success => {
      if (success?.code === "200") {
        this.contractList = success?.result
      }
    })
  }
}
