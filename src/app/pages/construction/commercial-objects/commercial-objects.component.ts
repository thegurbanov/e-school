import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommercialObjectAddDto, CommercialObjectDto} from "../../../model/construction/commercialObject.dto";
import {CommercialObjectService} from "../services/commercial-object.service";
import {ToastrService} from "ngx-toastr";
import {ContractDto} from "../../../model/accounting/contract.dto";
import {ContractService} from "../../accounting/services/contract.service";

@Component({
  selector: 'app-commercial-objects',
  templateUrl: './commercial-objects.component.html',
  styleUrls: ['./commercial-objects.component.scss']
})
export class CommercialObjectsComponent implements OnInit {

  commercialObjectsDto!: CommercialObjectDto[]
  commercialObjectForm!: FormGroup
  commercialObjectProperyNameList: any[] = [
    {
      value: 'id',
      title: 'Id',
      type: 'text',
      hasValidate: false
    },
    {
      value: 'info',
      title: 'Ad',
      type: 'text',
      hasValidate: false
    },
    {
      value: 'nomre',
      title: 'Nömrə',
      type: 'number',
      hasValidate: true
    },
    {
      value: 'repairType',
      title: 'Təmir vəziyyəti',
      type: 'number',
      hasValidate: false
    },
    {
      value: 'mertebeNomresi',
      title: 'Mərtəbə nömrəsi',
      type: 'number',
      hasValidate: true
    },
    {
      value: 'sahe',
      title: 'Sahəsi',
      type: 'number',
      hasValidate: false
    },
    {
      value: 'otaqSay',
      title: 'Otaq sayı',
      type: 'number',
      hasValidate: false
    },
    {
      value: 'total',
      title: 'Qiyməti',
      type: 'number',
      hasValidate: false
    },
    {
      value: 'oneTotal',
      title: '1 kv/m2 qiyməti',
      type: 'number',
      hasValidate: false
    },
    {
      value: 'discountOneTotal',
      title: 'Endirim (1 kv/m2)',
      type: 'number',
      hasValidate: false
    },
    {
      value: 'discountTotal',
      title: 'Endirim Cəmi',
      type: 'number',
      hasValidate: false
    },
    {
      value: 'discountTotalPercent',
      title: 'Endirim %-lə',
      type: 'number',
      hasValidate: false
    },
    {
      value: 'note',
      title: 'Qeyd',
      type: 'text',
      hasValidate: false
    }
  ]

  isFormReset: boolean = true
  selectedCommercialObject! : CommercialObjectDto

  constructor(private commercialObjectService: CommercialObjectService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private contractService: ContractService) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getCommercialObjectList()
  }

  resetForm() {
    this.commercialObjectForm.reset()
    this.isFormReset = true
  }

  createForm() {
    this.commercialObjectForm = this.formBuilder.group({})
    this.commercialObjectProperyNameList.forEach(property => {
      this.commercialObjectForm.addControl(property.value, this.formBuilder.control(''))
      if (property.hasValidate) {
        this.commercialObjectForm.controls[property.value].setValidators([Validators.required])
      }
    })
  }

  get validation(): { [key: string]: AbstractControl } {
    return this.commercialObjectForm.controls;
  }

  getCommercialObjectList() {
    this.commercialObjectService.getCommercialObjectList().subscribe(success => {
      this.commercialObjectsDto = success.result
    })
  }

  getCommercialObjectById(garageId: string) {
    this.commercialObjectService.getCommercialObjectById(garageId).subscribe(success => {
      this.selectedCommercialObject = success?.result
      this.commercialObjectForm.setValue(success?.result)
      this.isFormReset = false
    })
  }

  scrollModal(scrollDataModal: any, commercialId: string) {
    this.getCommercialObjectById(commercialId)
    this.modalService.open(scrollDataModal, {scrollable: true, size: "xl"});
  }

  addCommercialObject() {
    if (this.commercialObjectForm.valid) {
      const body: CommercialObjectAddDto = Object.assign({}, this.commercialObjectForm.value)
      this.commercialObjectService.addCommercialObject(body).subscribe(success => {
        this.commercialObjectsDto = success.result
        this.commercialObjectForm.reset()
        this.toastrService.success(success.message)
      })
    }
  }

  updateCommercialObject() {
    if (this.commercialObjectForm.valid) {
      const body = Object.assign({}, this.commercialObjectForm.value)
      this.commercialObjectService.updateCommercialObject(body).subscribe(success => {
        this.getCommercialObjectList()
        this.toastrService.success(success.message)
        this.resetForm()
      })
    }
  }

  deleteCommercialObjectById(id: string) {
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
        this.commercialObjectService.deleteCommercialObjectById(id).subscribe(success => {
          this.getCommercialObjectList()
          this.toastrService.success(success.message)
        })
      }
    })
  }
}
