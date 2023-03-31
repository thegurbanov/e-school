import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ContractService} from "../services/contract.service";
import {CurrencyDto} from "../../../model/accounting/currency.dto";
import {CurrencyService} from "../services/currency.service";
import {CashboxesService} from "../cashbox/cashboxes.service";
import {CashboxDto} from "../../../model/accounting/cashbox.dto";
import {PaymentService} from "../services/payment.service";
import {PaymentInitialInfoDto} from "../../../model/accounting/paymentInitialInfo.dto";
import {BankAccountsService} from "../bank-accounts/bank-accounts.service";
import {BankAccountDto} from "../../../model/accounting/bankAccount.dto";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {ContractDto} from "../../../model/accounting/contract.dto";
import {InvoiceDto} from "../../../model/accounting/invoiceDto";
import {InvoiceService} from "../services/invoice.service";

@Component({
  selector: 'app-payment-for-contract',
  templateUrl: './payment-for-contract.component.html',
  styleUrls: ['./payment-for-contract.component.scss']
})
export class PaymentForContractComponent implements OnInit {

  form!: FormGroup
  contractList: ContractDto[] = []
  currencyList: CurrencyDto[] = []
  cashboxList: CashboxDto[] = []
  bankAccountList: BankAccountDto[] = []
  selectedContract!: ContractDto
  invoiceList: InvoiceDto[] = []

  constructor(private contractService: ContractService,
              private currencyService: CurrencyService,
              private cashboxService: CashboxesService,
              private bankAccountService: BankAccountsService,
              private paymentService: PaymentService,
              private toastrService: ToastrService,
              private modalService: NgbModal,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this.createForm()
    this.checkRoute()
    this.getContractAllList()
    this.getCurrencyList()
    this.getBankAccountList()
    this.getCashboxList()
    this.changePaymentKind({target: {value: 'CASHBOX'}})
  }

  checkRoute() {
    this.activatedRoute.params.subscribe(params => {
      if (params['contractId']) {
        this.selectContract(params['contractId'])
        this.form.controls['contractId'].disable()
      }

      if (params['paymentAmount']) {
        this.form.controls['paymentAmount'].setValue(Number(params['paymentAmount']))
      }

      if (params['currencyId']) {
        this.form.controls['currencyId'].setValue(params['currencyId'])
      }

    })
  }

  createForm() {
    this.form = new FormGroup({
      bankAccountId: new FormControl({value: '', disabled: true}, [Validators.required]),
      contractId: new FormControl('', [Validators.required]),
      currencyId: new FormControl('', [Validators.required]),
      kassaId: new FormControl({value: '', disabled: true}, [Validators.required]),
      paymentAmount: new FormControl('', [Validators.required]),
      paymentPaidType: new FormControl(''),
      isInvoice: new FormControl(false)
    })
  }

  get validation(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  selectContract(contractId: string) {
    this.form.controls['contractId'].setValue(contractId)
  }

  getContractAllList() {
    this.contractService.getAllContracts().toPromise().then(success => {
      this.contractList = success?.result
    })
  }

  getCurrencyList() {
    this.currencyService.getList().toPromise().then(success => {
      this.currencyList = success?.result
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

  scrollModal(scrollDataModal: any) {
    this.modalService.open(scrollDataModal, {scrollable: true, size: "xl"});
  }

  changePaymentKind(event: any) {
    const paymentKind = event.target.value

    if (paymentKind === 'CASHBOX') {
      this.form.controls['kassaId'].enable()
      this.form.controls['bankAccountId'].disable()
      this.form.controls['bankAccountId'].setValue('')
      this.form.controls['paymentPaidType'].setValue('CASH')
    }

    if (paymentKind === 'BANK') {
      this.form.controls['bankAccountId'].enable()
      this.form.controls['kassaId'].disable()
      this.form.controls['kassaId'].setValue('')
      this.form.controls['paymentPaidType'].setValue('BANK')
    }

  }

  addPayment() {
    if (this.form.valid) {
      let entity: PaymentInitialInfoDto = Object.assign({}, this.form.getRawValue())
      if (this.form.controls['kassaId'].disabled) {
        entity.kassaId = ''
      }
      if (this.form.controls['bankAccountId'].disabled) {
        entity.bankAccountId = ''
      }

      this.paymentService.add(entity).toPromise().then(success => {
        if (success?.code === "200") {
          this.modalService.dismissAll()
          this.toastrService.success(success?.message)
          this.router.navigate(['accounting/payments']).then()
        }
      })
    }
  }

  getContractById() {
    const contractId: string = this.form.controls['contractId'].value
    this.contractService.getContractById(contractId).toPromise().then(response => {
      if (response?.code === "200") {
        this.selectedContract = response?.result
        if (this.form.controls['isInvoice'].value === true) {
          this.changePaymentLogic()
        }
      }
    })
  }

  changePaymentLogic() {
    if (this.form.controls['isInvoice'].value === true) {
      this.invoiceService.getInvoicesByContractId(this.selectedContract.id).toPromise().then(response => {
        if (response?.code === "200") {
          this.invoiceList = response?.result
        }
      })
    }
  }
}
