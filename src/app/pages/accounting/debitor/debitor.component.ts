import {Component, OnInit} from '@angular/core';
import {DebtDto} from "../../../model/accounting/debt.dto";
import {DebitorService} from './debitor.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-debitor',
  templateUrl: './debitor.component.html',
  styleUrls: ['./debitor.component.scss']
})
export class DebitorComponent implements OnInit {

  debitorList: DebtDto[] = []
  selectedDebitor!: DebtDto

  constructor(private debitorService: DebitorService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getDebitorListByInvoice()
  }

  getDebitorListByContract() {
    this.debitorService.getDebitorListByContract().toPromise().then(success => {
      if (success?.code === "200") {
        this.debitorList = success?.result
      }
    })
  }

  getDebitorListByInvoice() {
    this.debitorService.getDebitorListByInvoice().toPromise().then(success => {
      if (success?.code === "200") {
        this.debitorList = success?.result
      }
    })
  }

  selectDebitor(debitor: any, contractDetailsModal: any) {
    this.selectedDebitor = debitor
    this.openContractDetailsModal(contractDetailsModal)
  }

  openContractDetailsModal(modalContent: any) {
    this.modalService.open(modalContent, {scrollable: true, centered: true, size: 'xl'});
  }
}
