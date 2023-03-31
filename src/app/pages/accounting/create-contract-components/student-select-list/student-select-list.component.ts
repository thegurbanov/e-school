import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {CustomerDto} from "../../../../model/accounting/customer.dto";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ContractService} from "../../services/contract.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ContractDto} from "../../../../model/accounting/contract.dto";
import {ClassYearly, Yearly} from "../../../../model/school/class.dto";
import {EducationService} from "../../../school/education-year/education.service";
import {ClassesService} from "../../../school/classes/classes.service";

@Component({
  selector: 'app-student-select-list',
  templateUrl: './student-select-list.component.html',
  styleUrls: ['./student-select-list.component.scss']
})
export class StudentSelectListComponent implements OnInit {

  @Input() predimetId: string = ''
  @Output() event = new EventEmitter<any>()
  @Input() isEditable = true
  @Input() isShowMode = false

  form!: FormGroup
  studentList: CustomerDto[] = []
  selectedStudent!: CustomerDto
  contractList: ContractDto[] = []
  yearList: Yearly[] = []
  classList: ClassYearly[] = []

  constructor(private customerService: CustomerService,
              private contractService: ContractService,
              private modalService: NgbModal,
              private yearsService: EducationService,
              private classService: ClassesService) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getAllStudents()
    this.setDefaults()
    this.getEducationYears()
  }

  createForm() {
    this.form = new FormGroup({
      predimetId: new FormControl({value: '', disabled: !this.isEditable}, [Validators.required]),
      yearId: new FormControl({value: '', disabled: this.isShowMode}, [Validators.required]),
      classId: new FormControl({value: '', disabled: this.isShowMode}, [Validators.required])
    })
  }

  setDefaults() {
    if (this.predimetId !== '') {
      this.customerService.getCustomerById(this.predimetId).toPromise().then(success => {
        if (success?.code === "200") {
          this.selectedStudent = success?.result
          this.form.controls['predimetId'].setValue(this.selectedStudent?.id)
        }
      })
    }
  }

  getAllStudents() {
    this.customerService.getCustomers().toPromise().then(success => {
      if (success?.code === "200") {
        this.studentList = success.result
      }
    })
  }

  getClassesByYearId() {
    const yearId = this.form.controls['yearId'].value
    this.classService.getClassesByYear(yearId).toPromise().then(response => {
      if (response?.code === "200") {
        this.classList = response?.result
      }
    })
  }

  getStudent() {
    const id = this.form.controls['predimetId'].value
    this.customerService.getCustomerById(id).toPromise().then(success => {
      if (success?.code === "200") {
        this.selectedStudent = success.result
      }
    })
  }

  sendPredimet() {
    this.event.emit({
      parametrs: {
        classId : this.form.controls['classId'].value,
        yearId : this.form.controls['yearId'].value,
      },
      predimetId : this.form.controls['predimetId'].value,
      predimetType: "CUSTOMER"
    })
  }

  get validation(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  scrollModal(scrollDataModal: any) {
    this.modalService.open(scrollDataModal, {scrollable: true, size: "xl"});
  }

  getEducationYears() {
    this.yearsService.getYears(null).toPromise().then(response => {
      if (response?.code === "200") {
        this.yearList = response?.result
        const yearId = this.yearList.filter((x: Yearly) => x.isCurrent)[0].id
        this.form.controls['yearId'].setValue(yearId)
        this.getClassesByYearId()
      }
    })
  }
}
