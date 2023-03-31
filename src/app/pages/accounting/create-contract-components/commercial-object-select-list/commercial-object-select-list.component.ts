import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommercialObjectService} from "../../../construction/services/commercial-object.service";
import {CommercialObjectDto} from "../../../../model/construction/commercialObject.dto";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ContractService} from "../../services/contract.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ContractDto} from "../../../../model/accounting/contract.dto";

@Component({
  selector: 'app-commercial-object-select-list',
  templateUrl: './commercial-object-select-list.component.html',
  styleUrls: ['./commercial-object-select-list.component.scss']
})
export class CommercialObjectSelectListComponent implements OnInit {

  commercialObjects: CommercialObjectDto[] = []
  selectedCommercialObject!: CommercialObjectDto
  @Output() event = new EventEmitter<string>()
  @Input() predimetId: string = ''
  form!: FormGroup
  contractList: ContractDto[] = []
  @Input() isEditable: boolean = true
  @Input() contractValue: number = 0

  constructor(private commercialObjectService: CommercialObjectService,
              private contractService: ContractService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllCommercialObjects()
    this.createForm()
    this.setDefaults()
  }

  createForm() {
    this.form = new FormGroup({
      predimetId: new FormControl({value: '', disabled: !this.isEditable}, [Validators.required]),
    })
  }

  setDefaults() {
    if (this.predimetId !== '') {
      this.commercialObjectService.getCommercialObjectById(this.predimetId).toPromise().then(success => {
        if (success?.code === "200") {
          this.selectedCommercialObject = success?.result
          this.form.controls['predimetId'].setValue(this.selectedCommercialObject?.id)
        }
      })
    }
  }

  getAllCommercialObjects() {
    this.commercialObjectService.getCommercialObjectList().subscribe(success => {
      this.commercialObjects = success.result
    })
  }

  getCommercialObjectById(id: string) {
    this.commercialObjectService.getCommercialObjectById(id).subscribe(success => {
      this.selectedCommercialObject = success.result
      this.sendPredimetId(this.predimetId)
    })
  }

  sendPredimetId(predimetId: string) {
    this.event.emit(predimetId)
  }

  get validation(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  scrollModal(scrollDataModal: any) {
    this.modalService.open(scrollDataModal, {scrollable: true, size: "xl"});
  }

}
