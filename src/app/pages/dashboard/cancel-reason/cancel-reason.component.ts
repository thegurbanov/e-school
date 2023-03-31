import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CancelReasonService} from "./cancel-reason.service";
import {CancelReasonDto} from "../../../model/organization/cancelReason.dto";


@Component({
  selector: 'app-cancel-reason',
  templateUrl: './cancel-reason.component.html',
  styleUrls: ['./cancel-reason.component.scss']
})
export class CancelReasonComponent implements OnInit {

  cancelReasonList: CancelReasonDto[] = []
  cancelReasonForm!: FormGroup
  isFormReset: boolean = true
  selectedCancelReason!: CancelReasonDto

  constructor(private cancelReasonService: CancelReasonService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.createAddFormGroup()
    this.getCancelReasonList()
  }

  resetForm() {
    this.cancelReasonForm.reset()
    this.isFormReset = true
  }

  createAddFormGroup() {
    this.cancelReasonForm = new FormGroup({
      id: new FormControl({value: '', disabled: true}),
      info: new FormControl('', [Validators.required])
    })
  }

  get validation(): { [key: string]: AbstractControl } {
    return this.cancelReasonForm.controls;
  }

  getCancelReasonList() {
    this.cancelReasonService.getCancelReasonList().toPromise().then(success => {
      if (success?.code === "200") {
        this.cancelReasonList = success.result
      }
    })
  }

  getCancelReasonById(cancelReasonId: string) {
    this.cancelReasonService.getcCncelReasonById(cancelReasonId).toPromise().then(success => {
      if (success?.code === "200") {
        this.selectedCancelReason = success?.result
        this.cancelReasonForm.setValue(success?.result)
        this.isFormReset = false
      }
    })
  }

  addCancelReason() {
    if (this.cancelReasonForm.valid) {
      const body: CancelReasonDto = Object.assign({}, this.cancelReasonForm.value)
      this.cancelReasonService.addCancelReason(body).toPromise().then(success => {
        if (success?.code === "200") {
          this.cancelReasonList = success.result
          this.toastrService.success(success.message)
          this.cancelReasonForm.reset()
        }
      })
    }
  }

  updateCancelReason() {
    if (this.cancelReasonForm.valid) {
      const body = Object.assign({}, this.cancelReasonForm.getRawValue())
      this.cancelReasonService.updateCancelReason(body).subscribe(success => {
        if (success?.code === "200") {
          this.getCancelReasonList()
          this.toastrService.success(success?.message)
          this.resetForm()
        }
      })
    }
  }

  deleteCancelReasonById(cancelReasonId: string) {
    Swal.fire({
      title: 'Silmək istədiyinizə əminsiniz?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Bəli, Sil',
      cancelButtonText: 'İmtina',
    }).then((result) => {
      if (result.value) {
        this.cancelReasonService.deleteCancelReasonById(cancelReasonId).toPromise().then(success => {
          if (success?.code === "200") {
            this.getCancelReasonList()
            this.toastrService.success(success.message)
            this.resetForm()
          }
        })
      }
    })
  }
}
