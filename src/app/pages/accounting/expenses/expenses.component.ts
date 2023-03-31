import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExpensesDto} from 'src/app/model/accounting/expensesDto';
import {ExpensesGroupDto} from 'src/app/model/accounting/expensesGroupDto';
import {BaseResponse} from 'src/app/model/base.dto';
import {ExpensesService} from './expenses.service';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {ChartOfAccountsDto} from "../../../model/accounting/chartOfAccounts.dto";
import {ChartOfAccountsService} from "../services/chart-of-accounts.service";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private Service: ExpensesService,
    private toastr: ToastrService,
    private chartOfAccountsService: ChartOfAccountsService
  ) {
  }

  ExpensesGroupForm!: FormGroup;
  expensesGroups: any = [];
  chartOfAccountFormGroup!: FormGroup
  selectedexpensesGroup!: ExpensesGroupDto | any;
  taxDegreeList: any[] = [
    {
      info: 'ƏDV 18%',
      value: 18
    },
    {
      info: 'ƏDV 0%',
      value: 0
    },
    {
      info: 'ƏDV azad',
      value: null
    }
  ]

  ExpensesForm!: FormGroup;
  expense!: ExpensesDto;
  expenses: any = [];
  selectedExpense!: ExpensesDto | any;
  chartOfAccountsList: ChartOfAccountsDto[] = []

  ngOnInit(): void {
    this.createForms()
    this.getExpensesGroupList();
    this.getChartOfAccountList()
  }

  createForms() {
    this.ExpensesGroupForm = this.fb.group({
      id: [''],
      info: ['']
    })

    this.chartOfAccountFormGroup = this.fb.group({
      id: [''],
      info: ['']
    })

    this.ExpensesForm = this.fb.group({
      id: [''],
      info: ['', Validators.required],
      qrup: this.ExpensesGroupForm,
      taxDegree: [''],
      ucotHesabi: this.chartOfAccountFormGroup
    })
  }

  getChartOfAccountList() {
    this.chartOfAccountsService.getList().toPromise().then(response => {
      if (response?.code === "200") {
        this.chartOfAccountsList = response?.result
      }
    })
  }

  async createExpensesGroup() {
    if (this.ExpensesGroupForm.valid) {

      await this.Service.addExpensesGroup(this.ExpensesGroupForm.value).toPromise().then((response: BaseResponse<ExpensesGroupDto>) => {
        if (response?.code == 200) {
          this.expensesGroups = response.result;
        }
      })
    }
    else {
      this.toastr.warning("Add qeyd edin");
    }

  }

  async editExpensesGroup() {
    await this.Service.editExpensesGroup(this.ExpensesGroupForm.value).toPromise().then((response: BaseResponse<ExpensesGroupDto>) => {
      if (response?.code == 200) {
        this.expensesGroups = response.result;
        this.toastr.success("Məlumat dəyişdirildi")
      }
    }).then(() => {
      this.resetGroupForm();
    })

  }


  async getExpensesGroupList() {
    await this.Service.getExpensesGroupList("").toPromise().then((response: BaseResponse<ExpensesGroupDto>) => {
      if (response?.code == 200) {
        this.expensesGroups = response.result;
      }
    })
  }

  delExpensesGroup(expensesGroup: ExpensesGroupDto) {

    Swal.fire({
      title: 'Silmək isdədiyinizə əminsiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Bəli, Sil',
      cancelButtonText: 'İmtina',
    }).then((result) => {
      if (result.value) {

        this.Service.delExpensesGroup(expensesGroup.id).toPromise().then((response: BaseResponse<ExpensesGroupDto>) => {
          if (response?.code == 200) {
            this.expensesGroups = response.result;
            this.toastr.success(response.message);
            this.resetGroupForm();
          }
        })
      }
    });

  }

  async getExpensesGroupById(expensesGroup: ExpensesGroupDto) {
    await this.Service.getExpensesGroupById(expensesGroup.id).toPromise().then((response: BaseResponse<ExpensesGroupDto>) => {
      if (response?.code == 200) {
        this.selectedexpensesGroup = response.result;
        this.ExpensesGroupForm.patchValue(response.result);

      }
    }).then(() => {
      this.expenses = [];
      this.getExpensesList(this.selectedexpensesGroup)
    })
  }

  async createExpense() {
    if (this.ExpensesForm.valid) {
      // this.ExpensesForm.controls['ucotHesabi'].setValue({id: this.ExpensesForm.controls['ucotHesabi'].value})
      await this.Service.addExpense(this.ExpensesForm.value).toPromise().then((response: BaseResponse<ExpensesDto>) => {
        if (response?.code == 200) {
          this.expenses = response.result;
          this.resetExpenceForm();
        }
      })
    } else {
      this.toastr.warning("Ad qeyd edin")
    }


  }

  async editExpense() {
    await this.Service.editExpense(this.ExpensesForm.value).toPromise().then((response: BaseResponse<ExpensesDto>) => {
      if (response?.code == 200) {
        this.expenses = response.result;
        this.toastr.success("Məlumat dəyişdirildi")
      }
    }).then(() => {
      this.resetExpenceForm();
    })

  }


  async getExpensesList(expensesGroup: ExpensesGroupDto) {
    await this.Service.getExpensesList(expensesGroup?.id).toPromise().then((response: BaseResponse<ExpensesDto>) => {
      if (response?.code == 200) {
        this.expenses = response.result;
      }
    })
  }

  async delExpense(expense: ExpensesDto) {

    Swal.fire({
      title: 'Silmək isdədiyinizə əminsiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Bəli, Sil',
      cancelButtonText: 'İmtina',
    }).then((result) => {
      if (result.value) {
        this.Service.delExpense(expense.id).toPromise().then((response: BaseResponse<ExpensesDto>) => {
          if (response?.code == 200) {
            this.expenses = response.result;
            this.toastr.success(response.message);
            this.resetExpenceForm();
          }
        })
      }
    });

  }

  async getExpenseById(expense: ExpensesDto) {
    await this.Service.getExpenseById(expense?.id).toPromise().then((response: BaseResponse<ExpensesDto>) => {
      if (response?.code == 200) {
        this.selectedExpense = response.result;
        this.ExpensesForm.patchValue(response.result)
        console.log(this.selectedExpense)
      }
    })
  }



  resetGroupForm() {
    this.ExpensesGroupForm.reset();
    this.selectedexpensesGroup = null;
    this.expenses = null;
    this.resetExpenceForm();
    this.chartOfAccountFormGroup.reset()
  }

  resetExpenceForm() {
    this.ExpensesForm.patchValue({
      id: null,
      info: '',
      taxDegree: '',
    });
    this.selectedExpense = null;
    this.chartOfAccountFormGroup.reset()
  }
}
