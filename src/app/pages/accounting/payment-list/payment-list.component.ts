import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../services/payment.service";
import {ContractTypeDto} from "../../../model/accounting/contractType.dto";
import {ContractPaymentTypeDto} from "../../../model/accounting/contractPaymentType.dto";
import {ContractAgreementSideTypeDto} from "../../../model/accounting/contractAgreementSideType.dto";
import {ContractPredmetTypeDto} from "../../../model/accounting/contractPredmetType.dto";
import {ContractTypeService} from "../services/contract-type.service";
import {ContractPaymentTypeService} from "../services/contract-payment-type.service";
import {ContractPredmetTypeService} from "../services/contract-predmet-type.service";
import {ContractAgreementSideTypeService} from "../services/contract-agreement-side-type.service";
import {CashboxesService} from "../cashbox/cashboxes.service";
import {BankAccountsService} from "../bank-accounts/bank-accounts.service";
import {CashboxDto} from "../../../model/accounting/cashbox.dto";
import {BankAccountDto} from "../../../model/accounting/bankAccount.dto";
import {FormControl, FormGroup} from "@angular/forms";
import {GenericSearchDto} from "../../../model/accounting/genericSearch.dto";
import {PaginatedEntityDto} from "../../../model/accounting/paginationDtos/paginatedEntity.dto";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {environment} from "../../../../environments/environment";
import {PaymentDto} from "../../../model/accounting/payment.dto";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {

  baseUrl = environment.BASE_URL
  searchForm!: FormGroup
  contractTypeList: ContractTypeDto[] = []
  contractPaymentTypeList: ContractPaymentTypeDto[] = []
  contractAgreementSideTypeList: ContractAgreementSideTypeDto[] = []
  contractPredmetTypeList: ContractPredmetTypeDto[] = []
  cashboxList: CashboxDto[] = []
  bankAccountList: BankAccountDto[] = []
  paginatedPaymentList!: PaginatedEntityDto<PaymentDto>
  pageSize: number = 50
  pageNumber: number = 1
  selectedPaymentLine!: PaymentDto
  paymentTypeForm!: FormGroup

  constructor(private paymentService: PaymentService,
              private contractTypeService: ContractTypeService,
              private contractPaymentTypeService: ContractPaymentTypeService,
              private contractAgreementSideTypeService: ContractAgreementSideTypeService,
              private contractPredmetTypeService: ContractPredmetTypeService,
              private cashboxService: CashboxesService,
              private bankAccountService: BankAccountsService,
              private modalService: NgbModal,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.createSearchForm()
    this.getAll()
    this.getContractTypeList()
    this.getContractPaymentTypeList()
    this.getContractAgreementSideTypeList()
    this.getContractPredmetTypeList()
    this.getBankAccountList()
    this.getCashboxList()
    this.createPaymentTypeForm()
  }

  createSearchForm() {
    this.searchForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
      contractType: new FormControl(),
      paymentType: new FormControl(),
      cashboxId: new FormControl(),
      bankAccountId: new FormControl(),
      predmetId: new FormControl(),
      agreementSideId: new FormControl()
    })
  }

  createPaymentTypeForm() {
    this.paymentTypeForm = new FormGroup({
      isCashBoxActive: new FormControl(true),
      isBankActive: new FormControl(true)
    })
  }

  getAll() {

    const searchDto: GenericSearchDto = {
      criteria: [{
        key: "id",
        operation: "IS_NOT_NULL",
        value: ""
      }]
    }

    this.paymentService.search(searchDto, this.pageSize, 0, 'paymentDate', true)
      .toPromise().then(success => {
      if (success?.code === "200") {
        this.paginatedPaymentList = success?.result
      }
    })
  }

  getContractTypeList() {
    this.contractTypeService.getContractTypes().toPromise().then(success => {
      if (success?.code === "200") {
        this.contractTypeList = success?.result
      }
    })
  }

  getContractPaymentTypeList() {
    this.contractPaymentTypeService.getList().toPromise().then(success => {
      if (success?.code === "200") {
        this.contractPaymentTypeList = success?.result
      }
    })
  }

  getContractAgreementSideTypeList() {
    this.contractAgreementSideTypeService.getList().toPromise().then(success => {
      if (success?.code === "200") {
        this.contractAgreementSideTypeList = success?.result
      }
    })
  }

  getContractPredmetTypeList() {
    this.contractPredmetTypeService.getList().toPromise().then(success => {
      if (success?.code === "200") {
        this.contractPredmetTypeList = success?.result
      }
    })
  }

  getBankAccountList() {
    this.bankAccountService.getBankReports(null).toPromise().then(success => {
      this.bankAccountList = success?.result
    })
  }

  getCashboxList() {
    this.cashboxService.getCashboxes(null).toPromise().then(success => {
      this.cashboxList = success?.result
    })
  }

  hide() {
    document.getElementById('main')?.classList.remove('right-bar-enabled')
    document.getElementById('rightbar')?.classList.add('custom')
  }

  open() {
    document.getElementById('main')?.classList.add('right-bar-enabled', 'custom')
    document.getElementById('rightbar')?.classList.remove('custom')
  }

  search() {
    this.hide()

    let searchDto: GenericSearchDto = {
      criteria: []
    }

    if (searchDto.criteria.length === 0) {
      searchDto.criteria.push({
        key: "id",
        operation: "IS_NOT_NULL",
        value: ""
      })
    }

    this.paymentService.search(searchDto, this.pageSize, this.pageNumber - 1, "paymentDate", true).toPromise()
      .then(success => {
        if (success?.code === "200") {
          this.paginatedPaymentList = success?.result
        }
      })
  }

  searchByCashBox() {
    this.hide()

    let searchDto: GenericSearchDto = {
      criteria: []
    }

    if (searchDto.criteria.length === 0) {
      searchDto.criteria.push({
        key: "id",
        operation: "IS_NOT_NULL",
        value: ""
      })
    }

    this.paymentService.searchByCashBox(searchDto, this.pageSize, this.pageNumber - 1, "paymentDate", true).toPromise()
      .then(success => {
        if (success?.code === "200") {
          this.paginatedPaymentList = success?.result
        }
      })
  }

  searchByBank() {
    this.hide()

    let searchDto: GenericSearchDto = {
      criteria: []
    }

    if (searchDto.criteria.length === 0) {
      searchDto.criteria.push({
        key: "id",
        operation: "IS_NOT_NULL",
        value: ""
      })
    }

    this.paymentService.searchByBank(searchDto, this.pageSize, this.pageNumber - 1, "paymentDate", true).toPromise()
      .then(success => {
        if (success?.code === "200") {
          this.paginatedPaymentList = success?.result
        }
      })
  }


  reset() {
    this.searchForm.reset()
  }

  changePaymentType(event: any) {

  }

  changePageSize() {
    this.search()
  }

  changePageNumber = (): void => {
    this.search()
  }

  receivePageNumber(event: number) {
    this.pageNumber = event
  }

  openContractDetails(paymentDto: PaymentDto, contractModal: any) {
    this.selectedPaymentLine = paymentDto
    this.modalService.open(contractModal, {scrollable: true, size: "xl"})
  }

  checkCashBoxAndBankStatus() {
    const isCashBoxActive = this.paymentTypeForm.controls['isCashBoxActive'].value
    const isBankActive = this.paymentTypeForm.controls['isBankActive'].value

    if (isCashBoxActive === isBankActive && !isCashBoxActive && !isBankActive) {
      this.toastrService.warning("Ən azı bir ödəniş növü seçilməlidir!")
      return false
    }

    return true
  }


  changeCashBoxStatus() {
    const isCashBoxActive = this.paymentTypeForm.controls['isCashBoxActive'].value
    const isBankActive = this.paymentTypeForm.controls['isBankActive'].value

    if (this.checkCashBoxAndBankStatus()) {

      if (isBankActive && this.paymentTypeForm.controls['isBankActive'].disabled) {
        this.paymentTypeForm.controls['isBankActive'].enable()
      }

      if (isCashBoxActive && isBankActive) {
        this.search()
        return
      }

      if (isCashBoxActive && !isBankActive) {
        this.searchByCashBox()
        return
      }

      if (isBankActive && !isCashBoxActive) {
        this.searchByBank()
        return
      }

    } else {
      if (!isBankActive) {
        this.paymentTypeForm.controls['isCashBoxActive'].setValue(true)
        this.searchByCashBox()
        this.paymentTypeForm.controls['isCashBoxActive'].disable()
      } else {
        this.paymentTypeForm.controls['isCashBoxActive'].enable()
      }
    }
  }

  changeBankStatus() {
    const isCashBoxActive = this.paymentTypeForm.controls['isCashBoxActive'].value
    const isBankActive = this.paymentTypeForm.controls['isBankActive'].value

    if (this.checkCashBoxAndBankStatus()) {

      if (isCashBoxActive && this.paymentTypeForm.controls['isCashBoxActive'].disabled) {
        this.paymentTypeForm.controls['isCashBoxActive'].enable()
      }

      if (isCashBoxActive && isBankActive) {
        this.search()
        return
      }

      if (isCashBoxActive && !isBankActive) {
        this.searchByCashBox()
        return
      }

      if (isBankActive && !isCashBoxActive) {
        this.searchByBank()
        return
      }

    } else {
      if (!isCashBoxActive) {
        this.paymentTypeForm.controls['isBankActive'].setValue(true)
        this.searchByBank()
        this.paymentTypeForm.controls['isBankActive'].disable()
      } else {
        this.paymentTypeForm.controls['isBankActive'].enable()
      }
    }
  }

  getRowSpanValue() {
    if (this.paymentTypeForm.controls['isBankActive'].value && this.paymentTypeForm.controls['isCashBoxActive'].value) {
      return 2
    }

    return 1
  }

  get isCashBoxStatusActive() {
    return this.paymentTypeForm.controls['isCashBoxActive'].value
  }

  get isBankStatusActive() {
    return this.paymentTypeForm.controls['isBankActive'].value
  }


}
