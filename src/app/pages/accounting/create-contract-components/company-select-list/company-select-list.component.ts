import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ContractService} from "../../services/contract.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ContractDto} from "../../../../model/accounting/contract.dto";
import {CompanyDto} from "../../../../model/accounting/company.dto";
import {CompanyService} from "../../company/company.service";

@Component({
  selector: 'app-company-select-list',
  templateUrl: './company-select-list.component.html',
  styleUrls: ['./company-select-list.component.scss']
})
export class CompanySelectListComponent implements OnInit {

  form!: FormGroup
  companyList: CompanyDto[] = []
  selectedCompany!: CompanyDto
  @Input() consentId: string = ''
  contractList: ContractDto[] = []
  @Output() event = new EventEmitter<string>()
  @Input() isEditable: boolean = true

  constructor(private companyService: CompanyService,
              private contractService: ContractService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getAllCompanys()
    this.setDefaults()
  }

  setDefaults() {
    if (this.consentId && this.consentId !== '') {
      this.getCompany(this.consentId)
      this.form.controls['consentId'].setValue(this.consentId)
    }
  }

  createForm() {
    this.form = new FormGroup({
      consentId: new FormControl({value: '', disabled: !this.isEditable}, [Validators.required])
    })
  }

  getAllCompanys() {
    this.companyService.getCompanies('').toPromise().then(success => {
      if (success?.code === "200") {
        this.companyList = success.result
      }
    })
  }

  getCompany(companyId: string) {
    this.companyService.getCompanyById(companyId).toPromise().then(success => {
      if (success?.code === "200") {
        this.selectedCompany = success.result
        this.consentId = this.selectedCompany.id
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

}
