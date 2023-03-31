import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FlatService} from "../services/flat.service";
import {BinaMenzilDto} from "../../../model/construction/binaMenzil.dto";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss']
})
export class ApartmentDetailComponent implements OnInit {

  binaMenzilDto!: BinaMenzilDto
  form!: FormGroup
  @Input() apartmentId: string = ''
  @Output() isChangeData = new EventEmitter<boolean>()

  constructor(private flatService: FlatService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getApartmentById(this.apartmentId)
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      menzilNomre: new FormControl(),
      sahe: new FormControl({value: '', disabled: true}),
      otaqSay: new FormControl(),
      oneTotal: new FormControl(),
      total: new FormControl(),
      repairType: new FormControl(0),
      discountOneTotal: new FormControl(),
      discountTotal: new FormControl(),
      discountTotalPercent: new FormControl(),
      note: new FormControl(),
      isSale: new FormControl(1),
      repairStartDate: new FormControl(),
      repairEndDate: new FormControl()
    })
  }

  getApartmentById(apartmentId: string) {
    this.flatService.getFlatById(apartmentId).subscribe(success => {
      this.binaMenzilDto = success.result
      this.form.patchValue(this.binaMenzilDto)
      this.changeApartmentPricePercentByDiscountTotalPercent()
    })
  }

  updateApartment() {
    this.flatService.updateApartment(this.form.getRawValue()).toPromise().then(response => {
      if (response.code === "200") {
        this.toastrService.success(response?.message)
        this.sendChangeEvent()
      }
    })
  }

  changeApartmentOnePriceByTotal() {
    const total = this.form.controls['total'].value || 0
    const area = this.form.controls['sahe'].value || 1
    this.form.controls['oneTotal'].setValue(total / area)
    const discountTotalPercent = this.form.controls['discountTotalPercent'].value || 0
    this.changeApartmentPricePercentByDiscountTotalPercent()
  }

  changeApartmentPriceByOneTotal() {
    const oneTotal = this.form.controls['oneTotal'].value || 0
    const area = this.form.controls['sahe'].value || 1
    this.form.controls['total'].setValue(oneTotal * area)
    const discountTotalPercent = this.form.controls['discountTotalPercent'].value || 0
    this.changeApartmentPricePercentByDiscountTotalPercent()
  }

  changeApartmentPricePercentByDiscountTotalPercent() {
    const total = this.form.controls['total'].value || 0
    const percent = this.form.controls['discountTotalPercent'].value || 0
    const area = this.form.controls['sahe'].value || 1
    const discountValue = total * percent / 100
    const currentPrice = total - discountValue
    this.form.controls['discountTotal'].setValue(discountValue)
    this.form.controls['discountOneTotal'].setValue(currentPrice / area)
  }

  changeApartmentPricePercentByDiscountTotal() {
    const total = this.form.controls['total'].value || 0
    const discountTotal = this.form.controls['discountTotal'].value || 0
    const area = this.form.controls['sahe'].value || 1
    const percent = discountTotal / total * 100
    const discountValue = total * percent / 100
    const currentPrice = total - discountValue
    this.form.controls['discountTotalPercent'].setValue(percent)
    this.form.controls['discountOneTotal'].setValue(currentPrice / area)
  }

  changeApartmentPricePercentByDiscountOneTotal() {
    const oneTotal = this.form.controls['oneTotal'].value || 0
    const total = this.form.controls['total'].value || 0
    const discountOneTotal = this.form.controls['discountOneTotal'].value || 1
    const percent = (discountOneTotal / oneTotal) * 100
    const discountValue = total * percent / 100
    this.form.controls['discountTotalPercent'].setValue(percent)
    this.form.controls['discountTotal'].setValue(discountValue)
  }

  sendChangeEvent() {
    this.isChangeData.emit(true)
  }
}
