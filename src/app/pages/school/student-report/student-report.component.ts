import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseResponse} from 'src/app/model/base.dto';
import {ClassSection, Student, Yearly} from 'src/app/model/school/class.dto';
import {studentReportDto} from 'src/app/model/school/studentReportDto';
import {ClassesService} from '../classes/classes.service';
import {EducationService} from '../education-year/education.service';
import {SectionsService} from '../sections/sections.service';
import {StudentsService} from '../students/students.service';
import {StudentsReportService} from './student-report.service';
import {ContractService} from "../../accounting/services/contract.service";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {YearContractService} from "../services/year-contract.service";
import {ToastrService} from "ngx-toastr";
import {ContractTypeDto} from "../../../model/accounting/contractType.dto";
import {ContractTypeService} from "../../accounting/services/contract-type.service";
import {CustomerService} from "../../accounting/services/customer.service";
import {CustomerDto} from "../../../model/accounting/customer.dto";

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent implements OnInit {
  @Output() settingsButtonClicked = new EventEmitter();
  searchForm!: FormGroup

  navs: any = [
    {
      title: 'Müqavilələr',
      status: true,
      id: 1,
    },
    {
      title: 'Ödənişlər',
      status: false,
      id: 2,
    },
    {
      title: 'Qeyd',
      status: false,
      id: 3,
    },
  ];

  contractTypes: ContractTypeDto[] = []
  selectedNav = this.navs[0];
  customers: CustomerDto[] = []
  customerContracts: any[] = []
  contractType: any;

  constructor(
    private studentsReportService: StudentsReportService,
    private SectionService: SectionsService,
    private ClassesService: ClassesService,
    private modalService: NgbModal,
    private StudentService: StudentsService,
    private YearlyService: EducationService,
    private contractService: ContractService,
    private classYearlyContractService: YearContractService,
    private toastrService: ToastrService,
    private studentReportService: StudentsReportService,
    private contractTypeService: ContractTypeService,
    private customerService: CustomerService
  ) {
  }

  contractListForYears: any[] = []
  classYearlyContractForm!: FormGroup

  async ngOnInit() {
    await this.createSearchForm()
    await this.getYears()
    await this.getContractsBySearch()
    this.getContractTypesForEducation()
    this.getCustomers()
  }

  async createSearchForm() {
    this.searchForm = new FormGroup({
      yearly: new FormControl(),
      contractType: new FormControl(),
      sector: new FormControl(),
      classPrefix: new FormControl(),
      classYearly: new FormControl(),
      customer: new FormControl()
    })
  }

  getCustomers() {
    this.customerService.getCustomers().toPromise().then(response => {
      if (response?.code === "200") {
        this.customers = response?.result
      }
    })
  }

  changeTab(nav: any) {
    this.navs.filter((x: any) => {
      x.status = false;
      if (x.id == nav.id) {
        x.status = true;
        this.selectedNav = x;
      }
    });
  }

  getContractTypesForEducation() {
    this.contractTypeService.getContractTypesByContractCategory("EDUCATION").toPromise().then(response => {
      if (response?.code === "200") {
        this.contractTypes = response?.result
      }
    })
  }

  get validation(): { [key: string]: AbstractControl } {
    return this.classYearlyContractForm.controls;
  }

  open() {
    document.getElementById('main')?.classList.toggle('right-bar-enabled')
  }

  hide() {
    document.getElementById('main')?.classList.remove('right-bar-enabled')
    document.getElementById('rightbar')?.classList.add('custom')
  }

  student: any;
  contracts: any = [];

  async getContractsBySearch() {

    let searchData: any[] = []

    if (this.searchForm.controls['yearly'].value) {
      searchData.push({"year": this.searchForm.controls['yearly'].value.id})
    }

    if (this.searchForm.controls['customer'].value) {
      searchData.push({"customer": this.searchForm.controls['customer'].value.id})
    }

    if (this.searchForm.controls['contractType'].value) {
      searchData.push({"contractType": this.searchForm.controls['contractType'].value.id})
    }

    if (this.searchForm.controls['sector'].value) {
      searchData.push({"sector": this.searchForm.controls['sector'].value.id})
    }

    if (this.searchForm.controls['classPrefix'].value) {
      searchData.push({"classPrefix": this.searchForm.controls['classPrefix'].value})
    }

    if (this.searchForm.controls['classYearly'].value) {
      searchData.push({"classYearly": this.searchForm.controls['classYearly'].value.info})
    }


    await this.studentsReportService.search(searchData).toPromise()
      .then((response: BaseResponse<Student>) => {
        if (response?.code == 200) {
          this.contracts = response.result
        }
      }).then(() => {
        this.getSections();
        this.getClassesByYear();
      })
  }

  getContractsByContractTypeAndYear() {
    let searchData: any[] = [{"customer" : this.selectedContract.customerId}]

    if (this.year) {
      searchData.push({"year": this.year.id})
    }

    if (this.contractType) {
      searchData.push({"contractType": this.contractType.id})
    }

    this.studentsReportService.search(searchData).toPromise()
      .then((response: BaseResponse<any>) => {
        if (response?.code === 200) {
          this.customerContracts = response.result
        }
      })
  }

  selectedStudent: any = [];

  async getStudentById(student: Student) {
    await this.StudentService.getStudentById(student.id).toPromise().then((response: BaseResponse<studentReportDto>) => {
      if (response?.code == 200) {
        this.selectedStudent = response.result
      }
    })
  }

  years: any = [];
  year: any;
  async getYears() {
    await this.YearlyService.getYears("").toPromise().then((response: BaseResponse<Yearly>) => {
      if (response?.code == 200) {
        this.years = response.result;
        this.searchForm.controls['yearly'].setValue(this.years.find((year: any) => year.isCurrent == true)
          ?? this.years[0]);
      }
    })
  }

  classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  section: any = [];
  sections: any = [];
  async getSections() {
    await this.SectionService.getSections('')
      .toPromise()
      .then((response: BaseResponse<ClassSection>) => {
        if (response?.code == 200) {
          this.sections = response.result;
          this.section = this.sections;
        }
      })

  }

  _class: any = []
  allClasses: any = [];
  async getClassesByYear() {
    this._class = [];
    await this.ClassesService.getClassesByYear(this.searchForm.controls['yearly'].value.id).toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.allClasses = response.result;
        this.allClasses.filter((_class: any) => {
          _class.info = +_class.classPrefix + " " + _class.classPrefixIndicator
        });
        this._class = this.allClasses[0];
      }
    })
  }


  selectedContract!: any;
  selectCustomer(customer: any) {
    console.log(customer)
    this.selectedContract = customer
    console.log(this.selectedStudent)
  }

  openModal(customerDetail: any) {
    this.modalService.open(customerDetail, { scrollable: true, centered: true, size: 'xl' });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  openSettingYearAndContractModal(content: any) {
    this.studentReportService.getAllContractsForEducation().toPromise().then(success => {
      if (success?.code === "200") {
        this.contractListForYears = success?.result
      }
    })
    this.modalService.open(content, { size: "lg" });
  }

  addClassYearlyContract() {
    if (this.classYearlyContractForm.valid) {
      const body = {
        yearly: {
          id: this.classYearlyContractForm.controls['yearId'].value
        },
        contractId: this.classYearlyContractForm.controls['contractId'].value
      }
      this.classYearlyContractService.add(body).toPromise().then(success => {
        if (success?.code === "200") {
          this.toastrService.success(success?.message)
          this.modalService.dismissAll()
          // this.getStudents(this.year.id)
          this.classYearlyContractForm.reset()
        }
      })
    }
  }


  consentId!: string

  openContractModal(contractModal: any, customer: any) {

    let searchData = [
      {"year": this.searchForm.controls['yearly'].value.id},
      {"customer": customer.customerId}
    ]

    this.studentsReportService.search(searchData).toPromise()
      .then((response: BaseResponse<any>) => {
        if (response?.code == 200) {
          this.customerContracts = response?.result
        }
      })

    this.modalService.open(contractModal, {scrollable: true, size: "xl"});
  }

  openContractDetailsModal(contractDetailsModal: any) {
    this.modalService.open(contractDetailsModal, {scrollable: true, size: "xl"});
  }

}
