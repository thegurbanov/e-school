import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {CustomerDto} from "../../../../model/accounting/customer.dto";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ContractService} from "../../services/contract.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ContractDto} from "../../../../model/accounting/contract.dto";

@Component({
  selector: 'app-customer-select-list',
  templateUrl: './customer-select-list.component.html',
  styleUrls: ['./customer-select-list.component.scss']
})
export class CustomerSelectListComponent implements OnInit {

  form!: FormGroup
  customerList: CustomerDto[] = []
  selectedCustomer!: CustomerDto
  @Input() consentId: string = ''
  contractList: ContractDto[] = []
  @Output() event = new EventEmitter<string>()
  @Input() isEditable: boolean = true

  constructor(private customerService: CustomerService,
              private contractService: ContractService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getAllCustomers()
    this.setDefaults()
  }

  setDefaults() {
    if (this.consentId && this.consentId !== '') {
      this.getCustomer(this.consentId)
      this.form.controls['consentId'].setValue(this.consentId)
    }
  }

  createForm() {
    this.form = new FormGroup({
      consentId: new FormControl({value: '', disabled: !this.isEditable}, [Validators.required])
    })
  }

  getAllCustomers() {
    this.customerService.getCustomers().subscribe(success => {
      this.customerList = success.result
    })
  }

  getCustomer(customerId: string) {
    this.customerService.getCustomerById(customerId).toPromise().then(success => {
      if (success?.code === "200") {
        this.selectedCustomer = success.result
        this.consentId = this.selectedCustomer.id
        this.sendConsentId(this.consentId)
      }
    })
  }

  sendConsentId(consentId: string) {
    this.event.emit(consentId)
  }

  get validation(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  scrollModal(scrollDataModal: any) {
    this.modalService.open(scrollDataModal, {scrollable: true, size: "xl"});
  }

  openAddModal(customerAddModal: any) {
    this.modalService.open(customerAddModal, {scrollable: true, size: "lg"});
  }

  closeModals(){
    this.modalService.dismissAll()
  }
}
