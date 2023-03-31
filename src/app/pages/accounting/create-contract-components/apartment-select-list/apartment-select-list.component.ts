import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {FlatService} from "../../../construction/services/flat.service";
import {BinaDto} from "../../../../model/construction/bina.dto";
import {BinaService} from "../../../construction/services/bina.service";
import {ContractDto} from "../../../../model/accounting/contract.dto";
import {ContractService} from "../../services/contract.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BinaMenzilDto} from "../../../../model/construction/binaMenzil.dto";

@Component({
  selector: 'app-apartment-select-list',
  templateUrl: './apartment-select-list.component.html',
  styleUrls: ['./apartment-select-list.component.scss']
})
export class ApartmentSelectListComponent implements OnInit {

  form!: FormGroup
  apartmentList: BinaMenzilDto[] = []
  buildingList: BinaDto[] = []
  selectedApartment!: BinaMenzilDto
  @Output() event = new EventEmitter<string>()
  @Input() predimetId: string = ''
  contractList: ContractDto[] = []
  @Input() isEditable = true
  @Input() contractValue: number = 0

  constructor(private apartmentService: FlatService,
              private buildingService: BinaService,
              private contractService: ContractService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getAllBuildings()
    this.setDefaults()
  }

  createForm() {
    this.form = new FormGroup({
      predimetId: new FormControl({value: '', disabled: !this.isEditable}, [Validators.required]),
      buildingId: new FormControl({value: '', disabled: !this.isEditable}, [Validators.required])
    })
  }

  setDefaults() {
    if (this.predimetId !== '') {
      this.apartmentService.getFlatById(this.predimetId).toPromise().then(success => {
        if (success?.code === "200") {
          this.selectedApartment = success?.result
          this.form.controls['buildingId'].setValue(this.selectedApartment?.binaMertebe?.binaBlock?.bina?.id)
          this.getApartmentsByBuildingId(this.selectedApartment?.binaMertebe?.binaBlock?.bina?.id)
          this.form.controls['predimetId'].setValue(this.selectedApartment?.id)
        }
      })
    }
  }

  getAllBuildings() {
    this.buildingService.getAllBina().subscribe(success => {
      this.buildingList = success.result
    })
  }

  getApartmentsByBuildingId(buildingId: string) {
    this.buildingService.getApartmentsByBinaId(buildingId).toPromise().then(success => {
      if (success?.code === "200") {
        this.apartmentList = success.result
      }
    })
  }

  getApartmentInfo(apartmentId: string) {
    this.apartmentService.getFlatById(apartmentId).toPromise().then(success => {
      if (success?.code === "200") {
        this.selectedApartment = success.result
        this.sendPredimetId(this.selectedApartment.id)
      }
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
