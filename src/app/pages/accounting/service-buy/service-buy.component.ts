import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {CompanyDto} from 'src/app/model/accounting/company.dto';
import {ContractDto} from 'src/app/model/accounting/contract.dto';
import {ExpensesDto} from 'src/app/model/accounting/expensesDto';
import {ExpensesGroupDto} from 'src/app/model/accounting/expensesGroupDto';
import {InvoiceDto} from 'src/app/model/accounting/invoiceDto';
import {BaseResponse} from 'src/app/model/base.dto';
import {CompanyService} from '../company/company.service';
import {ExpensesService} from '../expenses/expenses.service';
import {ContractService} from '../services/contract.service';
import {ServiceBuyService} from './service-buy.service';
import {ChartOfAccountsService} from "../services/chart-of-accounts.service";
import {ChartOfAccountsDto} from "../../../model/accounting/chartOfAccounts.dto";

@Component({
  selector: 'app-service-buy',
  templateUrl: './service-buy.component.html',
  styleUrls: ['./service-buy.component.scss']
})
export class ServiceBuyComponent implements OnInit {

  InvoiceForm!: FormGroup;
  submitted: boolean = false;
  editable: boolean = false;
  chartOfAccountsList: ChartOfAccountsDto[] = []

  total: number = 0;
  contracts: any = [];

  constructor(
    private modalService: NgbModal,
    private Service: ServiceBuyService,
    private CompanyService: CompanyService,
    private ContractService: ContractService,
    private ExpensesService: ExpensesService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private chartOfAccountsService: ChartOfAccountsService
  ) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getInvoices();
    this.getChartOfAccountList()
  }

  getChartOfAccountList() {
    this.chartOfAccountsService.getList().toPromise().then(response => {
      if (response?.code === "200") {
        this.chartOfAccountsList = response?.result
      }
    })
  }

  createForm() {
    this.InvoiceForm = this.fb.group({
      id: [''],
      info: [''],
      contract: ['', Validators.required],
      expenses: ['', Validators.required],
      invoiceDate: [(new Date()).toISOString().substring(0, 10), Validators.required],
      invoiceNumber: ['', Validators.required],
      price: ['', Validators.required],
      counts: [1, Validators.required],
      qrup: ['', Validators.required],
      company: ['', Validators.required],
      amount: [''],
      electron: [false]
    })
  }

  get validation(): { [key: string]: AbstractControl } {
    return this.InvoiceForm.controls;
  }


  openScrollModal(scrollDataModal: any, invoice?: InvoiceDto) {
    if (invoice) {
      this.editable = true;
      this.Service.getInvoiceById(invoice.id).toPromise().then((response: BaseResponse<InvoiceDto>) => {
        if (response?.code == 200) {
          this.InvoiceForm.patchValue(response.result)
          this.getCompanyContracts(response.result.company, response.result.contract);

          this.InvoiceForm.patchValue({
            qrup: response.result.expenses.qrup
          })
        }


      })


    } else {
      this.resetForm();
      this.InvoiceForm.controls['counts'].setValue(1)
      this.InvoiceForm.controls['electron'].setValue(false)
      this.InvoiceForm.controls['invoiceDate'].setValue(new Date().toISOString().substring(0, 10))
    }
    this.modalService.open(scrollDataModal, { scrollable: false, size: 'xs' });
  }

  invoices: any = [];
  getInvoices() {
    this.Service.getInvoices('').toPromise().then((response: BaseResponse<InvoiceDto>) => {
      if (response?.code == 200) {
        this.invoices = response.result;
      }
    }).then(() => {
      this.getCompanies();
      this.getExpensesGroups();
    })
  }

  addInvoice() {
    this.submitted = true;
    if (this.InvoiceForm.valid) {
      this.Service.addInvoice(this.InvoiceForm.value).toPromise().then((response: BaseResponse<InvoiceDto>) => {
        if (response?.code == 200) {
          this.invoices = response.result;
          this.toastr.success(response.message);
          this.resetForm();
          this.modalService.dismissAll();
          this.submitted = false;
        }
      })
    }

  }

  editInvoice() {
    this.submitted = true;
    if (this.InvoiceForm.valid) {
      this.Service.editInvoice(this.InvoiceForm.value).toPromise().then((response: BaseResponse<InvoiceDto>) => {
        if (response?.code == 200) {
          this.invoices = response.result;
          this.toastr.success(response.message);
          this.resetForm();
          this.modalService.dismissAll();
          this.submitted = false;
        }
      })
    }

  }
  getTotal() {
    this.InvoiceForm.patchValue({
      amount: this.InvoiceForm.controls["price"].value * this.InvoiceForm.controls["counts"].value ?? 0
    })
  }

  companies: any = [];
  async getCompanies() {
    await this.CompanyService.getCompanies('').toPromise().then((response: BaseResponse<CompanyDto>) => {
      if (response?.code == 200) {
        this.companies = response.result;
      }
    })
  }




  expensesGroups: any = [];
  async getExpensesGroups() {
    await this.ExpensesService.getExpensesGroupList('').toPromise().then((response: BaseResponse<ExpensesGroupDto>) => {
      if (response?.code == 200) {
        this.expensesGroups = response?.result
      }
    })
  }

  expenses: any = [];
  async getExpenses(group: ExpensesGroupDto) {
    await this.ExpensesService.getExpensesList(group.id).toPromise().then((response: BaseResponse<ExpensesDto>) => {
      if (response?.code == 200) {
        this.expenses = response?.result
      }
    })
  }

  resetForm() {
    this.InvoiceForm.reset();
    this.editable = false;

  }

  getCompanyContracts(company: CompanyDto, contract?: ContractDto) {
    this.ContractService.getContractsByConsenTypeAndConsentId('COMPANY', company.id).toPromise()
      .then(response => {
        if (response?.code === "200") {
          this.contracts = response?.result;
          this.contracts.filter((x: any) => {
            x.title = x.contractType.info + " || " + x.contractNumber
          });
          this.InvoiceForm.patchValue({
            contract: this.contracts.find((selectedContract: ContractDto) => selectedContract?.id == contract?.id)
          });
          console.log(contract)
          console.log(this.InvoiceForm.value)
        }
      })
  }
}
