import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ContractTemplateDto} from "../../../model/accounting/contractTemplate.dto";
import {ContractPaymentTypeService} from "../../accounting/services/contract-payment-type.service";
import {GenericSearchDto} from "../../../model/accounting/genericSearch.dto";
import {ContractPredmetTypeDto} from "../../../model/accounting/contractPredmetType.dto";
import {FormControl, FormGroup} from "@angular/forms";
import {ContractAgreementSideTypeDto} from "../../../model/accounting/contractAgreementSideType.dto";
import {ContractService} from "../../accounting/services/contract.service";
import {BinaService} from "../services/bina.service";
import {ContractAgreementSideTypeService} from "../../accounting/services/contract-agreement-side-type.service";
import {ContractTemplateService} from "../../accounting/services/contract-template.service";
import {ContractDto} from "../../../model/accounting/contract.dto";
import {ContractTypeService} from "../../accounting/services/contract-type.service";
import {ContractPredmetTypeService} from "../../accounting/services/contract-predmet-type.service";
import {ContractPaymentTypeDto} from "../../../model/accounting/contractPaymentType.dto";
import {ContractTypeDto} from "../../../model/accounting/contractType.dto";
import {PaginatedEntityDto} from "../../../model/accounting/paginationDtos/paginatedEntity.dto";

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {

  searchForm!: FormGroup
  contractTypeList: ContractTypeDto[] = []
  contractPaymentTypeList: ContractPaymentTypeDto[] = []
  contractAgreementSideTypeList: ContractAgreementSideTypeDto[] = []
  contractPredmetTypeList: ContractPredmetTypeDto[] = []
  contractTemplateList: ContractTemplateDto[] = []
  selectedContract!: ContractDto
  paginatedContractList!: PaginatedEntityDto<ContractDto>
  pageNumber: number = 1
  pageSize: number = 50
  tableColumns: any[] = [
    {
      title: 'Müştəri',
      isActive: true
    },
    {
      title: 'Müqavilə növü',
      isActive: true
    },
    {
      title: 'Ödəniş qaydası',
      isActive: true
    },
    {
      title: 'Cəmi məbləğ',
      isActive: true
    },
    {
      title: 'Ödənilib',
      isActive: true
    },
    {
      title: 'Ödənilib(%)',
      isActive: true
    },
    {
      title: 'Ödənilməlidir',
      isActive: true
    },
    {
      title: 'Son ödəniş',
      isActive: true
    },
    {
      title: 'Son ödəniş tarixi',
      isActive: true
    },
    {
      title: 'Müqavilə tarixi',
      isActive: true
    }
  ]

  constructor(private contractService: ContractService,
              private binaService: BinaService,
              private contractTypeService: ContractTypeService,
              private contractPaymentTypeService: ContractPaymentTypeService,
              private contractPredmetTypeService: ContractPredmetTypeService,
              private contractAgreementSideTypeService: ContractAgreementSideTypeService,
              private modalService: NgbModal,
              private contractTemplateService: ContractTemplateService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createSearchForm()
    this.getAllContracts()
    this.getContractTypeList()
    this.getContractPaymentTypeList()
    this.getContractPredmetTypeList()
    this.getContractAgreementSideTypeList()
  }

  createSearchForm() {
    this.searchForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
      contractType: new FormControl(),
      paymentType: new FormControl(),
      predmetId: new FormControl(),
      agreementSideId: new FormControl()
    })
  }

  getAllContracts() {
    const searchDto: GenericSearchDto = {
      criteria: [
        {
          key: "id",
          operation: "IS_NOT_NULL",
          value: ""
        }
      ]
    }

    this.contractService.search(searchDto, this.pageSize, 0, 'createdDate', true).toPromise().then(success => {
      if (success?.code === "200") {
        this.paginatedContractList = success?.result
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

  getContractTemplates() {
    this.contractTemplateService.getContractTemplateListByCategory('CONSTRUCTION').toPromise().then(success => {
      if (success?.code === "200") {
        this.contractTemplateList = success?.result
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

  getContractPredmetTypeList() {
    this.contractPredmetTypeService.getList().toPromise().then(success => {
      if (success?.code === "200") {
        this.contractPredmetTypeList = success?.result
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

  hide() {
    document.getElementById('main')?.classList.remove('right-bar-enabled')
    document.getElementById('rightbar')?.classList.add('custom')
  }

  open() {
    document.getElementById('main')?.classList.toggle('right-bar-enabled')
    document.getElementById('rightbar')?.classList.remove('custom')
  }

  search() {
    let searchDto: GenericSearchDto = {
      criteria: []
    }

    if (this.searchForm.controls['startDate'].value && this.searchForm.controls['endDate'].value) {
      searchDto.criteria.push({
        endValue: this.searchForm.controls['endDate'].value,
        key: "createdDate",
        operation: "BETWEEN",
        startValue: this.searchForm.controls['startDate'].value
      })
    }

    if (this.searchForm.controls['contractType'].value) {
      searchDto.criteria.push({
        key: "contractType",
        childKey: "id",
        operation: "JOIN_CHILD",
        value: this.searchForm.controls['contractType'].value
      })
    }

    if (this.searchForm.controls['paymentType'].value) {
      searchDto.criteria.push({
        key: "contractPaymentOrder",
        childKey: "paymentType",
        grandChildKey: "id",
        subOperation: "EQUAL",
        operation: "JOIN_GRAND_CHILD",
        value: this.searchForm.controls['paymentType'].value
      })
    }

    if (this.searchForm.controls['agreementSideId'].value) {
      searchDto.criteria.push({
        key: "contractType",
        childKey: "agreementSide",
        operation: "JOIN_CHILD",
        value: this.searchForm.controls['agreementSideId'].value
      })
    }

    if (this.searchForm.controls['predmetId'].value) {
      searchDto.criteria.push({
        key: "contractType",
        childKey: "predimet",
        operation: "JOIN_CHILD",
        value: this.searchForm.controls['predmetId'].value
      })
    }

    if (searchDto.criteria.length === 0) {
      searchDto.criteria.push({
        key: "id",
        operation: "IS_NOT_NULL",
        value: ""
      })
    }

    this.contractService.search(searchDto, this.pageSize, this.pageNumber - 1, 'createdDate', true).toPromise()
      .then(success => {
        if (success?.code === "200") {
          this.paginatedContractList = success?.result
        }
      })

  }

  createContractByTemplate(templateId: string) {
    this.router.navigate([`/accounting/create-contract/category/construction/template/${templateId}`]).then(() => {
      this.modalService.dismissAll()
    })
  }

  openScrollModal(scrollDataModal: any) {
    this.getContractTemplates()
    this.modalService.open(scrollDataModal, {scrollable: true, centered: true, size: 'xl'});
  }

  selectContract(contract: ContractDto, modalContent: any) {
    this.selectedContract = contract
    this.openContractDetailsModal(modalContent)
  }

  openContractDetailsModal(modalContent: any) {
    this.modalService.open(modalContent, {scrollable: true, centered: true, size: 'xl'});
  }

  resetForm() {
    this.searchForm.reset()
    this.getAllContracts()
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

  changeColumnActive(i: number) {
    this.tableColumns[i].isActive = !this.tableColumns[i].isActive
  }
}
