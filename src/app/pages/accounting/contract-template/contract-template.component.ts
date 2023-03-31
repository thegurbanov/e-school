import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ContractTypeService} from "../services/contract-type.service";
import {CurrencyService} from "../services/currency.service";
import {ContractPaymentTypeDto} from "../../../model/accounting/contractPaymentType.dto";
import {ContractTypeDto} from "../../../model/accounting/contractType.dto";
import {CurrencyDto} from "../../../model/accounting/currency.dto";
import {ContractTemplateService} from "../services/contract-template.service";
import {ContractTemplateDto} from "../../../model/accounting/contractTemplate.dto";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-contract-template',
  templateUrl: './contract-template.component.html',
  styleUrls: ['./contract-template.component.scss']
})
export class ContractTemplateComponent implements OnInit {

  form!: FormGroup
  paymentTypeList: ContractPaymentTypeDto[] = []
  contractTypes: ContractTypeDto[] = []
  currencyList: CurrencyDto[] = []
  canDisableFormControlNames: string[] = [
    'offerMonth', 'discountMonth', 'initialAmount'
  ]
  paymentTypeActive: any = {
    isLoan: true,
    isMonthlyOutcome: false,
    isCash: false
  }
  contractTemplateList: ContractTemplateDto[] = []
  selectedContractTemplate!: ContractTemplateDto

  constructor(private formBuilder: FormBuilder,
              private contractTypeService: ContractTypeService,
              private currencyService: CurrencyService,
              private contractTemplateService: ContractTemplateService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getContractTypes()
    this.getCurrencyList()
    this.getContractTemplates()
  }

  createForm() {
    this.form = this.formBuilder.group({
      discountMonth: new FormControl(),
      initialAmount: new FormControl(),
      totalAmount: new FormControl(),
      offerMonth: new FormControl(),
      paymentType: ['', Validators.required],
      currencyId: ['', Validators.required],
      contractType: ['', Validators.required],
      info: ['', Validators.required],
      id: ['']
    })
  }

  getContractTemplates() {
    this.contractTemplateService.getList().toPromise().then(success => {
      if (success?.code === "200") {
        this.contractTemplateList = success?.result
      }
    })
  }

  get validation(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getContractTypes() {
    this.contractTypeService.getContractTypes().toPromise().then(success => {
      if (success?.code === "200") {
        this.contractTypes = success?.result
      }
    })
  }

  getContractTemplateById(id: string) {
    this.contractTemplateService.getContractTemplateById(id).toPromise().then(success => {
      if (success?.code === "200") {
        this.selectedContractTemplate = success?.result
        this.setSelectedContractTypeToForm()
      }
    })
  }

  setSelectedContractTypeToForm() {
    this.form.controls['id'].setValue(this.selectedContractTemplate?.id)
    this.form.controls['info'].setValue(this.selectedContractTemplate?.info)
    this.form.controls['discountMonth'].setValue(this.selectedContractTemplate?.discountMonth)
    this.form.controls['initialAmount'].setValue(this.selectedContractTemplate?.initialAmount)
    this.form.controls['totalAmount'].setValue(this.selectedContractTemplate?.totalAmount)
    this.form.controls['offerMonth'].setValue(this.selectedContractTemplate?.offerMonth)
    this.form.controls['paymentType'].setValue(this.selectedContractTemplate?.paymentType?.id)
    this.changeContractType(this.selectedContractTemplate?.contractType?.id)
    this.form.controls['contractType'].setValue(this.selectedContractTemplate?.contractType?.id)
    this.form.controls['currencyId'].setValue(this.selectedContractTemplate?.currency?.id)
    this.changePaymentType(this.selectedContractTemplate?.paymentType?.id)
  }

  getCurrencyList() {
    this.currencyService.getList().subscribe(success => {
      if (success?.code === "200") {
        this.currencyList = success.result
      }
    })
  }

  changeContractType(contractType: string) {
    this.contractTypeService.getPaymentTypesByContractTypeId(contractType).toPromise().then(success => {
      if (success?.code === '200') {
        this.paymentTypeList = success?.result?.paymentTypeList
      }
    })
  }

  changePaymentType(paymentType: string) {
    if (paymentType === 'LOAN') {
      this.setPaymentTypeToLoan()
      return
    }

    if (paymentType === 'CASH') {
      this.setPaymentTypeToCash()
      this.clearCanDisableFormControls()
      return
    }

    if (paymentType === 'MONTHLY_OUTCOME') {
      this.setPaymentTypeToMonthlyOutcome()
      this.clearCanDisableFormControls()
      return
    }
  }

  clearCanDisableFormControls() {
    this.canDisableFormControlNames.forEach(controlName => {
      this.form.controls[controlName].setValue(0)
    })
  }

  setPaymentTypeToLoan() {
    this.enableCanDisableFormControls()

    for (let prop in this.paymentTypeActive) {
      if (prop === 'isLoan') {
        this.paymentTypeActive[prop] = true
        continue
      }

      this.paymentTypeActive[prop] = false
    }
  }

  setPaymentTypeToMonthlyOutcome() {
    this.disableCanDisableFormControls()

    for (let prop in this.paymentTypeActive) {
      if (prop === 'isMonthlyOutcome') {
        this.paymentTypeActive[prop] = true
        continue
      }

      this.paymentTypeActive[prop] = false
    }
  }

  setPaymentTypeToCash() {
    this.disableCanDisableFormControls()

    for (let prop in this.paymentTypeActive) {
      if (prop === 'isCash') {
        this.paymentTypeActive[prop] = true
        continue
      }

      this.paymentTypeActive[prop] = false
    }
  }

  disableCanDisableFormControls() {
    this.canDisableFormControlNames.forEach(controlName => {
      this.form.controls[controlName].disable()
    })
  }

  enableCanDisableFormControls() {
    this.canDisableFormControlNames.forEach(controlName => {
      this.form.controls[controlName].enable()
    })
  }

  isFormUpdatable(): boolean {
    return this.selectedContractTemplate !== undefined
  }

  add() {
    if (this.form.valid) {

      const body: ContractTemplateDto = {
        id: "",
        info: this.form.controls['info'].value,
        discountMonth: this.form.controls['discountMonth'].value ?? 0,
        initialAmount: this.form.controls['initialAmount'].value ?? 0,
        totalAmount: this.form.controls['totalAmount'].value ?? 0,
        offerMonth: this.form.controls['offerMonth'].value ?? 0,
        paymentType: {
          id: this.form.controls['paymentType'].value,
          info: ""
        },
        contractType: {
          id: this.form.controls['contractType'].value,
          info: ""
        },
        currency: {
          id: this.form.controls['currencyId'].value,
          info: '',
          isoCode: ''
        }
      }

      this.contractTemplateService.add(body).toPromise().then(success => {
        if (success?.code === "200") {
          this.toastrService.success(success?.message)
          this.reset()
        }
      })
    }
  }

  update() {
    if (this.form.valid) {
      const body: ContractTemplateDto = {
        id: this.form.controls['id'].value,
        info: this.form.controls['info'].value,
        discountMonth: this.form.controls['discountMonth'].value,
        initialAmount: this.form.controls['initialAmount'].value,
        offerMonth: this.form.controls['offerMonth'].value,
        totalAmount: this.form.controls['totalAmount'].value,
        paymentType: {
          id: this.form.controls['paymentType'].value,
          info: ""
        },
        contractType: {
          id: this.form.controls['contractType'].value,
          info: ""
        },
        currency: {
          id: this.form.controls['currencyId'].value,
          info: '',
          isoCode: ''
        },
      }

      this.contractTemplateService.updateContractTemplate(body).toPromise().then(success => {
        if (success?.code === "200") {
          this.toastrService.success(success?.message)
          this.reset()
        }
      })
    }
  }

  reset() {
    this.form.reset()
    this.getContractTemplates()
    this.enableCanDisableFormControls()
    //@ts-ignore
    this.selectedContractTemplate = null
  }

  deleteContractTemplateById(id: string) {
    Swal.fire({
      title: 'Silmək istədiyinizə əminsiniz?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Bəli, Sil',
      cancelButtonText: 'İmtina',
    }).then((result) => {
      if (result.value) {
        this.contractTemplateService.deleteContractTemplateById(id).toPromise().then(success => {
          if (success?.code === "200") {
            this.reset()
            this.toastrService.success(success.message)
          }
        })
      }
    })
  }

}
