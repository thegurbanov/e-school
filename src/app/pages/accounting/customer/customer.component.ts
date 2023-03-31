import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../services/customer.service";
import {CustomerDto} from "../../../model/accounting/customer.dto";
import {ToastrService} from "ngx-toastr";
import {GenderDto} from "../../../model/organization/gender.dto";
import {GenderService} from "../../dashboard/services/gender.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customerForm!: FormGroup
  genders: GenderDto[] = []

  selectedCustomer!: CustomerDto
  @Input() customerId: string = ''
  @Output() isModifyDataEvent = new EventEmitter<boolean>()
  @Input() isOnlyAdd: boolean = false
  @Input() isOnlyEdit: boolean = false

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private customerService: CustomerService,
              private toastrService: ToastrService,
              private genderService: GenderService) {
  }

  ngOnInit(): void {
    this.createForm()
    this.checkRoute()
    this.getGenders()
  }

  getGenders() {
    this.genderService.getList().toPromise().then(response => {
      if (response?.code === "200") {
        this.genders = response?.result
      }
    })
  }

  ngOnChanges() {
    if (this.customerId !== '') {
      this.getCustomerById(this.customerId)
    }
  }

  checkRoute() {
    this.activatedRoute.params.subscribe(params => {
      if (params['customerId']) {
        this.getCustomerById(params['customerId'])
      }
    })

    if (this.customerId && this.customerId !== '') {
      this.getCustomerById(this.customerId)
    }

  }

  createForm() {
    this.customerForm = this.formBuilder.group({
      id: [''],
      fatherName: ['', [Validators.required, Validators.min(2), Validators.max(50)]],
      firstName: ['', [Validators.required, Validators.min(2), Validators.max(50)]],
      secondName: ['', [Validators.required, Validators.min(2), Validators.max(50)]],
      matherName: [''],
      dob: ['', [Validators.required]],
      documentSeriya: [null],
      documentFin: [null],
      documentOrqan: [null],
      fullName: [''],
      gender: ['', [Validators.required]]
    })
  }

  add() {
    const body = {
      "customerDocument": null,
      "dob": this.customerForm.controls['dob'].value,
      "fatherName": this.customerForm.controls['fatherName'].value,
      "firstName": this.customerForm.controls['firstName'].value,
      "gender": this.customerForm.controls['gender'].value,
      "matherName": this.customerForm.controls['matherName'].value,
      "secondName": this.customerForm.controls['secondName'].value,
    }

    // @ts-ignore
    this.customerService.addCustomer(body).toPromise().then(response => {
      if (response?.code === "200") {
        this.toastrService.success(response?.message)
        this.sendModifyInfo()
      }
    })
  }

  update() {
    const body = {
      "id": this.customerForm.controls['id'].value,
      "dob": this.customerForm.controls['dob'].value,
      "fatherName": this.customerForm.controls['fatherName'].value,
      "firstName": this.customerForm.controls['firstName'].value,
      "gender": this.customerForm.controls['gender'].value,
      "matherName": this.customerForm.controls['matherName'].value,
      "secondName": this.customerForm.controls['secondName'].value,
    }

    // @ts-ignore
    this.customerService.updateCustomer(body).toPromise().then(response => {
      if (response?.code === "200") {
        this.toastrService.success(response?.message)
        this.sendModifyInfo()
      }
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  getCustomerById(customerId: string) {
    this.customerService.getCustomerById(customerId).toPromise().then(success => {
      if (success?.code === "200") {
        this.selectedCustomer = success?.result
        this.setCustomerInfoToForm(this.selectedCustomer)
      }
    })
  }

  setCustomerInfoToForm(customerDto: CustomerDto) {
    this.customerForm.controls['id'].setValue(customerDto.id)
    this.customerForm.controls['dob'].setValue(customerDto.dob)
    this.customerForm.controls['fatherName'].setValue(customerDto.fatherName)
    this.customerForm.controls['firstName'].setValue(customerDto.firstName)
    this.customerForm.controls['gender'].setValue(customerDto.gender)
    this.customerForm.controls['matherName'].setValue(customerDto.matherName)
    this.customerForm.controls['secondName'].setValue(customerDto.secondName)
  }

  reset() {
    //@ts-ignore
    this.selectedCustomer = undefined
    this.customerForm.reset()
  }

  sendModifyInfo() {
    this.isModifyDataEvent.emit(true)
  }

}
