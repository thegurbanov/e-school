import {Component, OnInit} from '@angular/core';
import {CreditorService} from "./creditor.service";
import {DebtDto} from "../../../model/accounting/debt.dto";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-creditor',
  templateUrl: './creditor.component.html',
  styleUrls: ['./creditor.component.scss']
})
export class CreditorComponent implements OnInit {

  creditorList: DebtDto[] = []
  selectedCreditor!: DebtDto

  constructor(private creditorService: CreditorService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getCreditorListByInvoice()
  }

  getCreditorListByInvoice() {
    this.creditorService.getDebitorListByInvoice().toPromise().then(success => {
      if (success?.code === "200") {
        this.creditorList = success?.result
      }
    })
  }

  getCreditorListByContract() {
    this.creditorService.getDebitorListByContract().toPromise().then(success => {
      if (success?.code === "200") {
        this.creditorList = success?.result
      }
    })
  }

  selectCreditor(creditor: any, contractDetailsModal: any) {
    this.selectedCreditor = creditor
    this.openContractDetailsModal(contractDetailsModal)
  }

  openContractDetailsModal(modalContent: any) {
    this.modalService.open(modalContent, {scrollable: true, centered: true, size: 'xl'});
  }
}
