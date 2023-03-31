import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContractTypeDto} from "../../../model/accounting/contractType.dto";
import {ContractTypeService} from "../services/contract-type.service";
import {ContractPaymentTypeService} from "../services/contract-payment-type.service";
import {ContractPaymentTypeDto} from "../../../model/accounting/contractPaymentType.dto";
import {ContractPredmetTypeDto} from "../../../model/accounting/contractPredmetType.dto";
import {ContractPredmetTypeService} from "../services/contract-predmet-type.service";
import {ContractAgreementSideTypeDto} from "../../../model/accounting/contractAgreementSideType.dto";
import {ContractAgreementSideTypeService} from "../services/contract-agreement-side-type.service";
import {ContractTypeCategoryDto} from "../../../model/accounting/contractTypeCategory.dto";
import {ContractTypeCategoryService} from "../services/contract-type-category.service";
import {ChartOfAccountsService} from "../services/chart-of-accounts.service";
import {ChartOfAccountsDto} from "../../../model/accounting/chartOfAccounts.dto";

@Component({
  selector: 'app-contract-config',
  templateUrl: './contract-config.component.html',
  styleUrls: ['./contract-config.component.scss']
})
export class ContractConfigComponent implements OnInit {

  addForm!: FormGroup
  contractTypeList: ContractTypeDto[] = []
  contractPaymentTypeList: ContractPaymentTypeDto[] = []
  contractPredmetTypeList: ContractPredmetTypeDto[] = []
  contractAgreementSideTypeList: ContractAgreementSideTypeDto [] = []
  selectedContractType!: ContractTypeDto | null
  contractTypeCategoryList: ContractTypeCategoryDto[] = []
  chartOfAccountsList: ChartOfAccountsDto [] = []

  constructor(private contractTypeService: ContractTypeService,
              private contractPaymentTypeService: ContractPaymentTypeService,
              private contractPredmetTypeService: ContractPredmetTypeService,
              private contractAgreementSideTypeService: ContractAgreementSideTypeService,
              private contractTypeCategoryService: ContractTypeCategoryService,
              private chartOfAccountsService: ChartOfAccountsService) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getContractTypeList()
    this.getContractPaymentTypeList()
    this.getContractPredmetTypeList()
    this.getContractAgreementSideTypeList()
    this.getContractTypeCategoryList()
    this.getChartOfAccountList()
  }

  createForm() {
    this.addForm = new FormGroup({
      id: new FormControl('', Validators.required),
      info: new FormControl('', Validators.required),
      agreementSide: new FormControl('', Validators.required),
      predimet: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      qroup: new FormControl('', Validators.required),
      prefix: new FormControl()
    })
  }

  getContractTypeList() {
    this.contractTypeService.getContractTypes().toPromise().then(success => {
      if (success?.code === "200") {
        this.contractTypeList = success?.result
      }
    })
  }


  getChartOfAccountList() {
    this.chartOfAccountsService.getList().toPromise().then(response => {
      if (response?.code === "200") {
        this.chartOfAccountsList = response?.result
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

  getContractTypeCategoryList() {
    this.contractTypeCategoryService.getList().toPromise().then(success => {
      if (success?.code === "200") {
        this.contractTypeCategoryList = success?.result
      }
    })
  }

  selectContractType(id: string) {
    this.addForm.enable()
    this.contractTypeService.getContractTypeById(id).toPromise().then(success => {
      if (success?.code === "200") {
        this.selectedContractType = success?.result
        this.setFormValue()
        this.setFormIsEnable()
      }
    })
  }

  setFormValue() {
    this.addForm.controls['id'].setValue(this.selectedContractType?.id)
    this.addForm.controls['info'].setValue(this.selectedContractType?.info)
    this.addForm.controls['agreementSide'].setValue(this.selectedContractType?.agreementSide)
    this.addForm.controls['predimet'].setValue(this.selectedContractType?.predimet)
    this.addForm.controls['category'].setValue(this.selectedContractType?.category)
    this.addForm.controls['prefix'].setValue(this.selectedContractType?.prefix)
    this.addForm.controls['qroup'].setValue(this.selectedContractType?.paymentLogic)
  }

  setFormIsEnable() {
    if (this.selectedContractType?.editable) {
      this.addForm.enable()
      return
    }

    this.addForm.disable()
  }

  clearForm() {
    this.addForm.enable()
    this.addForm.reset()
    this.selectedContractType = null
  }

}
