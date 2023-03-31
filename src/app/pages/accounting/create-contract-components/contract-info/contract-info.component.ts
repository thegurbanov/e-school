import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CurrencyDto} from "../../../../model/accounting/currency.dto";
import {CurrencyService} from "../../services/currency.service";
import {ContractService} from "../../services/contract.service";
import {ContractPaymentOrderDto} from "../../../../model/accounting/contractPaymentOrder.dto";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ContractTypeDto} from "../../../../model/accounting/contractType.dto";
import {ContractPaymentTypeDto} from "../../../../model/accounting/contractPaymentType.dto";
import {ContractTypeService} from "../../services/contract-type.service";
import {ContractTemplateService} from "../../services/contract-template.service";
import {ContractTemplateDto} from "../../../../model/accounting/contractTemplate.dto";

@Component({
  selector: 'app-contract-info',
  templateUrl: './contract-info.component.html',
  styleUrls: ['./contract-info.component.scss']
})
export class ContractInfoComponent implements OnInit {

  form!: FormGroup
  paymentTypeList: ContractPaymentTypeDto[] = []
  contractTypes: ContractTypeDto[] = []
  currencyList: CurrencyDto[] = []
  canDisableFormControlNames: string[] = [
    'offerMonth', 'discountMonth', 'offerPercent', 'initialAmount', 'offerDate'
  ]
  isShowCalculatorInfo: boolean = false
  contractPaymentOrder!: ContractPaymentOrderDto
  predimet!: any
  consentId: string = ''
  selectedContractTemplate!: ContractTemplateDto
  calcTypes: any [] = [
    {id: "FREE", value: "Sərbəst"},
    {id: "MONTHLY", value: "Aylıq"}
  ]
  selectedContractType!: ContractTypeDto
  selectedPaymentType!: string
  isPredmetEditable: boolean = true
  manualPaymentGraphicForm!: FormGroup


  constructor(private formBuilder: FormBuilder,
              private currencyService: CurrencyService,
              private contractService: ContractService,
              private toastrService: ToastrService,
              private router: Router,
              private contractTypeService: ContractTypeService,
              private activatedRoute: ActivatedRoute,
              private contractTemplateService: ContractTemplateService) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getCurrencyList()
    this.disableCanDisableFormControls()
    this.checkRouteParams()
  }

  checkRouteParams() {
    this.activatedRoute.params.subscribe(params => {
      if (params['contractCategory']) {
        this.getContractTypesByCategory(params['contractCategory']).then(() => {
          if (params['predimetId'] && params['contractTypeId']) {
            this.changeContractType(params['contractTypeId'])
            this.predimet = params['predimetId']
            this.form.controls['contractType'].disable()
            this.isPredmetEditable = false
          }
        })
      } else {
        this.getContractTypes()
      }

      if (params['templateId']) {
        this.getContractTemplateByContractTemplateId(params['templateId'])
      }

    })
  }

  createForm() {
    this.form = this.formBuilder.group({
      contractDate: [(new Date()).toISOString().substring(0,10), Validators.required],
      discountMonth: new FormControl('', [Validators.required, Validators.min(0)]),
      initialAmount: new FormControl('', [Validators.required, Validators.min(0)]),
      offerAmount: [{value: '', disabled: true}],
      offerDate: ['', Validators.required],
      offerMonth: ['', Validators.required],
      offerPercent: new FormControl('', [Validators.required, Validators.min(0)]),
      paymentType: ['', Validators.required],
      currencyId: ['', Validators.required],
      contractNumber: ['', Validators.required],
      contractType: ['', Validators.required],
      expireDate: ['', Validators.required],
      isTerm: new FormControl(true),
      totalValue: new FormControl('', [Validators.required, Validators.min(0)]),
      discount: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      calcType: [{value: '', disabled: true}, Validators.required],
      isManualPaymentGraphic: new FormControl(false),
      discountWithNumber: new FormControl(0, [Validators.required, Validators.min(0)]),
    })

    this.clearCanDisableFormControls()
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

  getContractTemplateByContractTemplateId(templateId: string) {
    this.contractTemplateService.getContractTemplateById(templateId).toPromise().then(success => {
      if (success?.code === "200") {
        this.selectedContractTemplate = success?.result
        this.setContractTemplateToContract(this.selectedContractTemplate)
      }
    })
  }

  setContractTemplateToContract(template: ContractTemplateDto) {
    this.form.controls['contractType'].setValue(template?.contractType.id)
    this.changeContractType(template?.contractType?.id)
    this.form.controls['discountMonth'].setValue(template?.discountMonth)
    this.form.controls['initialAmount'].setValue(template?.initialAmount)
    this.form.controls['offerMonth'].setValue(template?.offerMonth)
    this.form.controls['paymentType'].setValue(template?.paymentType?.id)
    this.changePaymentType(template?.paymentType?.id)
    this.form.controls['currencyId'].setValue(template?.currency?.id)
    this.form.controls['offerAmount'].setValue(template?.totalAmount)
    this.form.controls['totalValue'].setValue(template?.totalAmount)
    this.form.controls['discount'].setValue(0)
  }

  async getContractTypesByCategory(category: string) {
    await this.contractTypeService.getContractTypesByContractCategory(category).toPromise().then(success => {
      if (success?.code === "200") {
        this.contractTypes = success?.result
      }
    })
  }

  getCurrencyList() {
    this.currencyService.getList().subscribe(success => {
      this.currencyList = success.result
    })
  }

  consoleForm() {
    const body = {
      "consentId": this.consentId,
      "consentSide": this.selectedContractType?.agreementSide,
      "contractCalculatorInfo": {
        "discountMonth": this.form.controls['discountMonth'].value,
        "initialAmount": this.form.controls['initialAmount'].value,
        "offerAmount": this.form.controls['offerAmount'].value,
        "offerDate": this.form.controls['offerDate'].value,
        "offerMonth": this.form.controls['offerMonth'].value,
        "offerPercent": this.form.controls['offerPercent'].value,
        "paymentType": this.form.controls['paymentType'].value,
      },
      "contractDate": this.form.controls['contractDate'].value,
      "contractNumber": this.form.controls['contractNumber'].value,
      "contractPredimet": this.predimet === '' ? null : {
        "predimetId": this.predimet,
        "predimetType": this.selectedContractType?.predimet
      },
      "contractType": {
        id: this.form.controls['contractType'].value
      },
      "currencyId": this.form.controls['currencyId'].value,
      "expireDate": this.form.controls['expireDate'].value,
      "totalValue": this.form.controls['totalValue'].value,
      "discount": this.form.controls['discount'].value,
      'calcType': this.form.controls['calcType'].value
    }

    console.log(body)
  }

  disableCanDisableFormControls(){
    this.canDisableFormControlNames.forEach(controlName => {
      this.form.controls[controlName].disable()
    })
  }

  enableCanDisableFormControls(){
    this.canDisableFormControlNames.forEach(controlName => {
      this.form.controls[controlName].enable()
    })
  }

  changePaymentType(paymentType: string) {

    this.form.controls['calcType'].disable()
    this.isShowCalculatorInfo = false
    this.selectedPaymentType = paymentType
    this.setExpireActive()
    this.changePaymentGraphicStatus({target: {checked: false}})
    this.setPaymentGraphicPassive()

    if (paymentType === 'LOAN') {
      this.addValidators()
      this.enableCanDisableFormControls()
      this.changeIsTerm({target: {checked: false}})
      this.setExpirePassive()
      this.setPaymentGraphicActive()
      return
    }

    if (paymentType === 'CASH') {
      this.form.controls['calcType'].setValue(this.calcTypes[0].id)
      this.form.controls['calcType'].enable()
      this.clearValidators()
      this.clearCanDisableFormControls()
      this.disableCanDisableFormControls()
      return
    }

    if (paymentType === 'MONTHLY_OUTCOME') {
      this.clearValidators()
      this.clearCanDisableFormControls()
      this.disableCanDisableFormControls()
    }
  }

  changeContractType(contractTypeId: string) {
    //@ts-ignore
    this.selectedContractType = this.contractTypes.find(x => x.id === contractTypeId)
    this.form.controls['contractType'].setValue(contractTypeId)

    this.contractTypeService.getPaymentTypesByContractTypeId(contractTypeId).toPromise().then(success => {
      if (success?.code === '200') {
        this.paymentTypeList = success?.result?.paymentTypeList
      }
    })
  }

  addValidators() {
    this.canDisableFormControlNames.forEach(controlName => {
      this.form.controls[controlName].setValidators(Validators.required)
    })
  }

  clearValidators() {
    this.canDisableFormControlNames.forEach(controlName => {
      this.form.controls[controlName].clearValidators()
    })
  }

  clearCanDisableFormControls(){
    this.canDisableFormControlNames.forEach(controlName => {
      this.form.controls[controlName].setValue(0)
    })

    this.form.controls['offerDate'].setValue('')
  }

  receiveConsentId(event: any) {
    this.consentId = event
  }

  receivePredimetId(event: any) {
    this.predimet = event
  }

  getContractCalculator() {
    if (this.form.valid) {
      const body = {
        "contractCalculatorInfo": {
          "discountMonth": this.form.controls['discountMonth'].value,
          "initialAmount": this.form.controls['initialAmount'].value,
          "offerAmount": this.form.controls['offerAmount'].value,
          "offerDate": `${this.form.controls['offerDate'].value}`,
          "offerMonth": this.form.controls['offerMonth'].value,
          "offerPercent": this.form.controls['offerPercent'].value,
          "paymentType": this.form.controls['paymentType'].value,
        },
        "contractDate": this.form.controls['contractDate'].value
      }

      this.contractService.calculateContractInfo(body).toPromise().then(success => {
        if (success?.code === '200') {
          this.isShowCalculatorInfo = true
          this.contractPaymentOrder = success.result
        }
        }
      )
    }
  }

  createContract() {
    const body = {
      "consentId": this.consentId,
      "consentSide": this.selectedContractType?.agreementSide,
      "contractCalculatorInfo": {
        "discountMonth": this.form.controls['discountMonth'].value,
        "initialAmount": this.form.controls['initialAmount'].value,
        "offerAmount": this.form.controls['offerAmount'].value,
        "offerDate": this.form.controls['offerDate'].value,
        "offerMonth": this.form.controls['offerMonth'].value,
        "offerPercent": this.form.controls['offerPercent'].value,
        "paymentType": this.form.controls['paymentType'].value,
      },
      "contractDate": this.form.controls['contractDate'].value,
      "contractNumber": this.form.controls['contractNumber'].value,
      "contractPredimet": this.predimet,
      "contractType": {
        id: this.form.controls['contractType'].value
      },
      "currencyId": this.form.controls['currencyId'].value,
      "expireDate": this.form.controls['expireDate'].value,
      "totalValue": this.form.controls['totalValue'].value,
      "discount": this.form.controls['discount'].value,
      'calcType': this.form.controls['calcType'].value
    }

    let isChildComponentsValid: boolean = (this.selectedContractType.predimet)
      ? this.consentId !== '' && this.predimet !== ''
      : this.consentId !== ''

    if (this.form.valid && isChildComponentsValid) {
      this.contractService.postContract(body).toPromise().then(success => {
        if (success?.code === '200') {
          let routerLink: string

          switch (this.selectedContractType.category) {
            case 'CONSTRUCTION': {
              routerLink = 'construction/contracts'
              break;
            }
            case 'EDUCATION': {
              routerLink = 'school/contracts'
              break;
            }
            case 'ACCOUNTING': {
              routerLink = 'accounting/contracts'
              break;
            }
            default: {
              routerLink = 'accounting/contracts'
              break;
            }
          }

          const initalAmount = this.form.controls['initialAmount'].value
          if(initalAmount > 0){
             routerLink = `accounting/payment-for-contract/${success.result.id}/${initalAmount}/${success.result.contractPaymentOrder.currency.id}`
          }

          this.router.navigate([routerLink]).then(() => {
            this.toastrService.success(success.result.info)
          })
        }
      })
    }
  }

  changeIsTerm(event: any) {
    const dateInput = this.form.controls['expireDate']
    dateInput.setValue('')

    if (event.target.checked) {
      dateInput.setValidators(Validators.required)
      dateInput.enable()
      return
    }

    dateInput.clearValidators()
    dateInput.disable()
  }

  calculateOfferAmountWithTotalValue() {
    if (this.form.controls['discountWithNumber'].value !== undefined) {
      this.calculateOfferAmountWithDiscountNumber()
      return
    }

    if (this.form.controls['discount'].value !== undefined) {
      this.calculateOfferAmountWithPercent()
      return
    }
  }

  calculateOfferAmountWithPercent() {
    const discount = Number(this.form.controls['discount'].value || 0)
    const value = Number(this.form.controls['totalValue'].value || 0)
    let offerAmount = 0
    let discountWithNumber = 0
    if (discount >= 0 && value >= 0 && discount <= 100) {
      offerAmount = (value * (100 - discount)) / 100
      discountWithNumber = value - offerAmount
    }

    this.form.controls['offerAmount'].setValue(offerAmount)
    this.form.controls['discountWithNumber'].setValue(discountWithNumber)
  }

  calculateOfferAmountWithDiscountNumber() {
    const discountWithNumber = Number(this.form.controls['discountWithNumber'].value || 0)
    const value = Number(this.form.controls['totalValue'].value || 0)
    this.form.controls['discountWithNumber'].setValidators([Validators.max(value)])
    let offerAmount = 0
    let discountWithPercent = 0
    if (discountWithNumber <= value) {
      offerAmount = value - discountWithNumber
      discountWithPercent = (discountWithNumber / value) * 100
    }

    this.form.controls['offerAmount'].setValue(offerAmount)
    this.form.controls['discount'].setValue(discountWithPercent)
  }


  setExpirePassive() {
    this.form.controls['isTerm'].setValue(false)
    this.form.controls['isTerm'].disable()
  }

  setExpireActive() {
    this.form.controls['isTerm'].enable()
  }

  setPaymentGraphicActive() {
    this.form.controls['isManualPaymentGraphic'].enable()
  }

  setPaymentGraphicPassive() {
    this.form.controls['isManualPaymentGraphic'].setValue(false)
    this.form.controls['isManualPaymentGraphic'].disable()
  }

  changePaymentGraphicStatus(event: any) {
    const isChecked: boolean = event.target.checked
    if (isChecked) {
      this.clearCanDisableFormControls()
      this.disableCanDisableFormControls()
      this.form.controls['initialAmount'].enable()
      this.form.controls['initialAmount'].setValue('')
      this.createPaymentGraphicForm()

      return
    }

    this.enableCanDisableFormControls()
  }

  createPaymentGraphicForm() {
    this.manualPaymentGraphicForm = this.formBuilder.group({
      manualPayments: new FormArray([])
    })

    this.addRowToManualPaymentGraphic()
  }

  get getPaymentGraphics() {
    return this.manualPaymentGraphicForm.get('manualPayments') as FormArray
  }

  addRowToManualPaymentGraphic() {
    this.getPaymentGraphics.push(new FormGroup({
      lineDate: new FormControl(''),
      line: new FormControl({value: this.getPaymentGraphics.length + 1, disabled: true}),
      payment: new FormControl('')
    }))

    console.log(this.manualPaymentGraphicForm.getRawValue())
  }

  getManualPaymentGraphicTotalValue(): number {
    return this.getPaymentGraphics.getRawValue().reduce((accumulator, obj) => {
      return accumulator + obj.payment;
    }, 0);
  }

  isManualPaymentGraphicValid() {
    const totalValue = this.form.controls['offerAmount'].value || 0
    const initialAmount = this.form.controls['initialAmount'].value || 0
    const paymentGraphicsTotal = this.getManualPaymentGraphicTotalValue() || 0

    return totalValue - initialAmount === paymentGraphicsTotal;
  }
}
