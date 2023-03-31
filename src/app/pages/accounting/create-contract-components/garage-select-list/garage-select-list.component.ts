import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GarageService} from "../../../construction/services/garage.service";
import {GarageDto} from "../../../../model/construction/garage.dto";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ContractService} from "../../services/contract.service";
import {ContractDto} from "../../../../model/accounting/contract.dto";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-garage-select-list',
  templateUrl: './garage-select-list.component.html',
  styleUrls: ['./garage-select-list.component.scss']
})
export class GarageSelectListComponent implements OnInit {

  garageList: GarageDto[] = []
  selectedGarage!: GarageDto
  form!: FormGroup
  @Input() predimetId: string = ''
  @Output() event = new EventEmitter<string>()
  contractList: ContractDto[] = []
  @Input() isEditable: boolean = true
  @Input() contractValue: number = 0

  constructor(private garageService: GarageService,
              private contractService: ContractService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getGarageList()
    this.setDefaults()
  }

  createForm() {
    this.form = new FormGroup({
      predimetId: new FormControl({value: '', disabled: !this.isEditable}, [Validators.required]),
    })
  }

  setDefaults() {
    if (this.predimetId !== '') {
      this.garageService.getGarageById(this.predimetId).toPromise().then(success => {
        if (success?.code === "200") {
          this.selectedGarage = success?.result
          this.form.controls['predimetId'].setValue(this.selectedGarage?.id)
        }
      })
    }
  }

  getGarageList() {
    this.garageService.getGarageList().toPromise().then(success => {
      this.garageList = success.result
    })
  }

  getGarageById(id: string) {
    this.garageService.getGarageById(id).toPromise().then(success => {
      this.selectedGarage = success.result
      this.sendPredimetId(this.selectedGarage.id)
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
