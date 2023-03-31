import {Component, Input, OnInit} from '@angular/core';
import {ContractService} from "../../services/contract.service";
import {ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ContractDto} from "../../../../model/accounting/contract.dto";
import {PaymentDto} from "../../../../model/accounting/payment.dto";
import {CreditorOrDebitorList} from "./creditorOrDebitorList";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {

  baseUrl = environment.BASE_URL
  contractDto!: ContractDto
  isLoan: boolean = true
  navs: any[] = [
    {
      id: 1,
      title: 'Müqavilə üzrə ödəniş qrafiki',
      status: true
    },
    {
      id: 2,
      title: 'Müqavilə üzrə ödənişlər',
      status: false
    },
    {
      id: 3,
      title: 'Müqavilə sənədləri',
      status: false
    }
  ]
  contractList: ContractDto[] = []
  @Input() contractId: string = ''
  selectedNav: any = this.navs[0]
  paymentList: PaymentDto[] = []
  creditorOrDebitorList = CreditorOrDebitorList

  constructor(private contractService: ContractService,
              private route: ActivatedRoute,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.checkRoutes()
    this.getContractInvoices()
  }

  checkRoutes() {
    if (this.contractId === '') {
      this.route.params.subscribe(params => {
        this.contractId = params['contractId']
        this.getContractDetailsById(this.contractId)
      })
    } else {
      this.getContractDetailsById(this.contractId)
    }
  }

  setNavsByInvoiceType() {
    if (this.contractDto.contractType.paymentLogic === 'PURCHASE') {
      this.navs.push(
        {
          id: 4,
          title: 'Debitor qaimə',
          status: false
        })
      return
    }

    if (this.contractDto?.contractType?.paymentLogic === 'SALE') {
      this.navs.push(
        {
          id: 4,
          title: 'Kreditor qaimə',
          status: false
        })
    }
  }

  getContractDetailsById(contractId: string) {
    this.contractService.getContractById(contractId).toPromise().then(success => {
      if (success?.code === "200") {
        this.contractDto = success.result
        this.isLoan = this.contractDto.contractPaymentOrder.paymentType.id === 'LOAN'
        this.setNavsByInvoiceType()
      }
    })
  }

  scrollModal(scrollDataModal: any) {
    this.modalService.open(scrollDataModal, {scrollable: true, size: "xl"});
  }

  getContractInvoices() {
    this.contractService.getContractInvoices(this.contractId).subscribe(success => {
      this.paymentList = success?.result
    })
  }

  changeSelectedNav(nav: any) {
    this.selectedNav = nav
    this.selectedNav.status = true
    this.navs.forEach(x => {
      if(x.title !== nav.title){
        x.status = false
      }
    })
  }
}
