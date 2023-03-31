import {Component, OnInit} from '@angular/core';
import {GarageService} from "../services/garage.service";
import {GarageAddDto, GarageDto} from "../../../model/construction/garage.dto";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ContractService} from "../../accounting/services/contract.service";
import {ContractDto} from "../../../model/accounting/contract.dto";


@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss']
})
export class GarageComponent implements OnInit {

  garageList!: GarageDto[]
  garageForm!: FormGroup
  garageProperyNameList: any[] = [
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
      value: 'coordinat',
      title: 'Koordinat',
      type: 'text',
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
  contractList: ContractDto[] = []
  selectedGarage!: GarageDto

  constructor(private garageService: GarageService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private contractService: ContractService) {
  }

  ngOnInit(): void {
    this.createAddFormGroup()
    this.getGarageList()
  }

  resetForm() {
    this.garageForm.reset()
    this.isFormReset = true
  }

  createAddFormGroup() {
    this.garageForm = this.formBuilder.group({})
    this.garageProperyNameList.forEach(property => {
      this.garageForm.addControl(property.value, this.formBuilder.control(''))
      if (property.hasValidate) {
        this.garageForm.controls[property.value].setValidators([Validators.required])
      }
    })
  }

  get validation(): { [key: string]: AbstractControl } {
    return this.garageForm.controls;
  }

  getGarageList() {
    this.garageService.getGarageList().subscribe(success => {
      this.garageList = success.result
    })
  }

  getGarageById(garageId: string) {
    this.garageService.getGarageById(garageId).subscribe(success => {
      this.selectedGarage = success?.result
      this.garageForm.setValue(success?.result)
      this.isFormReset = false
    })
  }

  addGarage() {
    if (this.garageForm.valid) {
      const body: GarageAddDto = Object.assign({}, this.garageForm.value)
      this.garageService.addGarage(body).subscribe(success => {
        this.garageList = success.result
        this.toastrService.success(success.message)
        this.garageForm.reset()
      })
    }
  }

  scrollModal(scrollDataModal: any, garageId : string) {
    this.getGarageById(garageId)
    this.modalService.open(scrollDataModal, {scrollable: true, size: "xl"});
  }

  updateGarage() {
    if (this.garageForm.valid) {
      const body = Object.assign({}, this.garageForm.value)
      this.garageService.updateGarage(body).subscribe(success => {
        this.getGarageList()
        this.toastrService.success(success.message)
      })
    }
  }

  deleteGarageById(garageId: string) {
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
        this.garageService.deleteGarageById(garageId).subscribe(success => {
          this.getGarageList()
          this.toastrService.success(success.message)
        })
      }
    })
  }
}
