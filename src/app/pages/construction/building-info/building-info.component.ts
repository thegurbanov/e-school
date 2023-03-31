import {Component, OnInit} from '@angular/core';
import {BinaService} from "../services/bina.service";
import {BinaDto} from "../../../model/construction/bina.dto";
import Swal from "sweetalert2";
import {ToastrService} from "ngx-toastr";
import {BinaViewDto} from "../../../model/construction/binaView.dto";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BinaBlockMertebeViewDto} from "../../../model/construction/binaBlockMertebeView.dto";
import {FloorService} from "../services/floor.service";
import {BinaMenzilViewDto} from "../../../model/construction/binaMenzilView.dto";

@Component({
  selector: 'app-building-info',
  templateUrl: './building-info.component.html',
  styleUrls: ['./building-info.component.scss']
})
export class BuildingInfoComponent implements OnInit {

  buildingList: BinaDto[] = []
  selectedBuilding!: BinaViewDto
  infoNavs: any[] = [
    {
      title: 'Bina',
      status: false,
    },
    {
      title: 'Giriş',
      status: false,
    },
    {
      title: 'Mərtəbə',
      status: false,
    },
    {
      title: 'Mənzil',
      status: false,
    }
  ]

  modalNavs: any[] = [
    {
      title: 'Əsas məlumatlar',
      status: true,
    },
    {
      title: 'Giriş strukturu',
      status: false,
    },
    {
      title: 'Mərtəbə strukturu',
      status: false,
    },
    {
      title: 'Mənzil strukturu',
      status: false,
    }
  ]

  selectedInfoNav!: any
  selectedModalNav = this.modalNavs[0]
  buildingAddForm!: FormGroup
  buildingUpdateForm!: FormGroup
  selectedFloor!: BinaBlockMertebeViewDto
  floorEditForm!: FormGroup
  selectedApartment!: BinaMenzilViewDto

  constructor(private buildingService: BinaService,
              private toastrService: ToastrService,
              private config: NgbModalConfig,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private floorService: FloorService) {
    config.backdrop = 'static'
    config.keyboard = false
  }

  ngOnInit(): void {
    this.createBuildingAddForm()
    this.createBuildingUpdateForm()
    this.getBuildingList()
    this.createFloorEditForm()
  }

  createBuildingAddForm() {
    this.buildingAddForm = new FormGroup({
      company: new FormControl('', [Validators.required]),
      info: new FormControl('', [Validators.required]),
      blockCount: new FormControl('', [Validators.required, Validators.min(1)]),
      blocks: new FormArray([]),
      adress: new FormControl('',),
      poct: new FormControl(''),
    })
  }

  createFloorEditForm() {
    this.floorEditForm = this.formBuilder.group({
      id: new FormControl(this.selectedFloor?.floor?.id),
      sahe: new FormControl(this.selectedFloor?.floor?.sahe, [Validators.required]),
      flatList: new FormArray([])
    })
  }

  addFlatsToFormArray() {

    this.getFlats.clear()
    this.selectedFloor?.flatList?.forEach(flat => {
      const flatForm = this.formBuilder.group({
        id: new FormControl(flat?.id),
        sahe: new FormControl(flat?.sahe, [Validators.required]),
        menzilNomre: new FormControl(flat?.menzilNomre),
        mertebeNomre: new FormControl(flat?.mertebeNomre),
        otaqSay: new FormControl(flat?.otaqSay),
        deleted : new FormControl(false)
      })

      this.getFlats.push(flatForm)
    })
  }

  get getFlats() {
    return this.floorEditForm.controls['flatList'] as FormArray
  }

  addFlat() {
    const flatForm = this.formBuilder.group({
      id: new FormControl(),
      sahe: new FormControl(),
      deleted: new FormControl(false)
    })

    this.getFlats.push(flatForm)
  }

  createBuildingUpdateForm() {
    this.buildingUpdateForm = new FormGroup({
      blockCount: new FormControl(this.selectedBuilding?.bina?.blockCount, [Validators.required]),
      company: new FormControl('Şirkət', [Validators.required]),
      info: new FormControl(this.selectedBuilding?.bina?.info, [Validators.required]),
      mertebeSay: new FormControl(this.selectedBuilding?.bina?.mertebeSay, [Validators.required]),
      mertebeSayDown: new FormControl(this.selectedBuilding?.bina?.mertebeSay, [Validators.required]),
      yasayishMertebeStart: new FormControl(this.selectedBuilding?.bina?.yasayishMertebeStart, [Validators.required]),
      adress: new FormControl(this.selectedBuilding?.bina?.adress, [Validators.required]),
      poct: new FormControl(this.selectedBuilding?.bina?.poct, [Validators.required])
    })

    this.disableAllControls()
  }

  disableAllControls(){
    for (let controlName in this.buildingUpdateForm.controls){
      this.buildingUpdateForm.controls[controlName].disable()
    }
  }

  goToBuildingDetailsPage() {
    this.selectModalNav({title: 'Əsas məlumatlar', status: false})
  }

  goToBlockDetailsPage() {
    this.createBlocksForm()
    this.selectModalNav({title: 'Giriş strukturu', status: false})
  }

  goToApartmentStructureDetailsPage() {
    this.createApartmentStructuresForm()
    this.selectModalNav({title: 'Mənzil strukturu', status: false})
  }

  goToFloorStructureDetailsPage() {
    this.createFloorStructuresForm()
    this.selectModalNav({title: 'Mərtəbə strukturu', status: false})
  }

  get buildAddFormValidation(): { [key: string]: AbstractControl } {
    return this.buildingAddForm.controls;
  }

  isValidMainBuildingInfo(): boolean {
    return this.buildingAddForm.controls['company'].valid
      && this.buildingAddForm.controls['info'].valid
      && this.buildingAddForm.controls['blockCount'].valid
  }

  isValidBlockStructure(): boolean {
    for (let i = 0; i < this.getBlocks.length; i++) {
      if (!this.getBlocks.controls[i].valid) {
        return false
      }
    }

    return true
  }

  get validation(): { [key: string]: AbstractControl } {
    return this.floorEditForm.controls;
  }

  get flatListValidation() {
    return (this.floorEditForm.controls.flatList as FormArray).controls;
  }

  get getBlocks() {
    return this.buildingAddForm.get('blocks') as FormArray
  }

  getFloorStructures(blockIndex: number) {
    return (this.buildingAddForm.get('blocks') as FormArray).at(blockIndex).get('floorStructures') as FormArray
  }

  getApartmentStructures(blockIndex: number) {
    return (this.buildingAddForm.get('blocks') as FormArray).at(blockIndex).get('apartmentStructures') as FormArray
  }

  createBlocksForm() {
    const blockCount = Number(this.buildingAddForm.controls['blockCount'].value)
    this.getBlocks.controls = []
    for (let i = 0; i < blockCount; i++) {
      this.getBlocks.push(new FormGroup({
        nomre: new FormControl({value: i + 1, disabled: true}),
        evSay: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(20)]),
        mertebeSay: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(99)]),
        mertebeSayDown: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(10)]),
        apartmentStructures: new FormArray([]),
        floorStructures: new FormArray([])
      }))
    }
  }

  createFloorStructuresForm() {
    const blockCount = Number(this.buildingAddForm.controls['blockCount'].value)

    for (let i = 0; i < blockCount; i++) {
      this.getFloorStructures(i).controls = []
    }

    for (let i = 0; i < blockCount; i++) {
      const mertebeSayUp = Number((this.getBlocks.at(i) as FormGroup).controls['mertebeSay'].value)
      const mertebeSayDown = Number((this.getBlocks.at(i) as FormGroup).controls['mertebeSayDown'].value)

      for (let j = -mertebeSayDown; j < 0; j++) {
        this.getFloorStructures(i).push(new FormGroup({
          row: new FormControl({value: j, disabled: true}),
          isResidintial: new FormControl(false)
        }))
      }

      for (let k =  1; k <=  mertebeSayUp; k++) {
        this.getFloorStructures(i).push(new FormGroup({
          row: new FormControl({value: k, disabled: true}),
          isResidintial: new FormControl(true)
        }))
      }
    }
  }

  createApartmentStructuresForm() {
    const blockCount = Number(this.buildingAddForm.controls['blockCount'].value)

    for (let i = 0; i < blockCount; i++) {
      this.getApartmentStructures(i).controls = []
    }

    for (let i = 0; i < blockCount; i++) {
      const mertebeSayUp = Number((this.getBlocks.at(i) as FormGroup).controls['mertebeSay'].value)
      const mertebeSayDown = Number((this.getBlocks.at(i) as FormGroup).controls['mertebeSayDown'].value)

      for (let j = 1; j <= mertebeSayDown + mertebeSayUp; j++) {
        this.getApartmentStructures(i).push(this.formBuilder.group({
          nomre: new FormControl({value: j, disabled: true}),
          otaqSay: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(20)]),
          sahe: new FormControl(null, [Validators.required, Validators.min(1)]),
        }))
      }

    }
  }

  getBuildingList() {
    this.buildingService.getAllBina().subscribe(success => {
      this.buildingList = success.result
    })
  }

  selectBuilding(building: BinaDto) {
    this.selectInfoNav(this.infoNavs[3])
    this.getSelectedBuildingInfo(building.id)
  }

  selectInfoNav(nav: any) {
    this.selectedInfoNav = nav
    this.selectedInfoNav.status = true
    this.infoNavs.forEach(item => {
      item.status = false
    })
    this.infoNavs.find(item => item.title === nav.title).status = true
  }

  getSelectedBuildingInfo(buildingId: string) {
    this.buildingService.getBuildingById(buildingId).toPromise().then(success => {
      if (success?.code === "200") {
        this.selectedBuilding = success?.result
        this.setSelectedBuildingToForm()
      }
    })
  }

  setSelectedBuildingToForm() {
    this.buildingUpdateForm.controls['blockCount'].setValue(this.selectedBuilding.bina.blockCount)
    this.buildingUpdateForm.controls['info'].setValue(this.selectedBuilding.bina.info)
    this.buildingUpdateForm.controls['mertebeSay'].setValue(this.selectedBuilding.bina.mertebeSay)
    this.buildingUpdateForm.controls['mertebeSayDown'].setValue(this.selectedBuilding.bina.mertebeSayDown)
    this.buildingUpdateForm.controls['yasayishMertebeStart'].setValue(this.selectedBuilding.bina.yasayishMertebeStart)
    this.buildingUpdateForm.controls['adress'].setValue(this.selectedBuilding.bina.adress)
    this.buildingUpdateForm.controls['poct'].setValue(this.selectedBuilding.bina.poct)
  }

  getApartmentsByFloorId(floorId: string) {
    this.buildingService.getFlatsByFloorId(floorId).subscribe(success => {
      this.selectedFloor = success?.result
      this.floorEditForm.controls['id'].setValue(this.selectedFloor?.floor?.id)
      this.floorEditForm.controls['sahe'].setValue(this.selectedFloor?.floor?.sahe)
      this.addFlatsToFormArray()
    })
  }

  selectModalNav(nav: any) {
    this.selectedModalNav = nav
    this.selectedModalNav.status = true
    this.modalNavs.forEach(item => {
      item.status = false
    })
    this.modalNavs.find(item => item.title === nav.title).status = true
  }

  addBuilding() {
    this.buildingService.addBuilding(this.buildingAddForm.getRawValue()).toPromise().then(success => {
      if (success?.code === "200") {
        this.getBuildingList()
        this.toastrService.success(success?.message)
        this.modalService.dismissAll()
        this.buildingAddForm.reset()
        this.selectModalNav(this.modalNavs[0])
      }
    })
  }

  updateFloor() {
    if (this.floorEditForm.valid) {
      this.floorService.updateFloor(this.floorEditForm.value).toPromise().then(success => {
        if (success?.code === '200') {
          this.modalService.dismissAll()
          this.getSelectedBuildingInfo(this.selectedBuilding?.bina?.id)
          this.toastrService.success(success?.message)
        }
      })
    }
  }

  scrollModal(scrollDataModal: any) {
    this.modalService.open(scrollDataModal, {size: 'lg', scrollable: true});
  }

  openModal(content: any, floorId: string) {
    this.getApartmentsByFloorId(floorId)
    this.modalService.open(content, {size: 'lg', scrollable: true});
  }

  selectApartmentInFloorEditModal(index: number) {
    const tbody = document.getElementById('tbody')
    if (tbody!.children[index].classList.contains('selected-apartment')) {
      tbody!.children[index].classList.remove('selected-apartment');
      (this.floorEditForm.controls.flatList as FormArray).controls[index].get('deleted')?.setValue(false)
    } else {
      Swal.fire({
        title: 'Silmək isdədiyinizə əminsiz?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#f46a6a',
        confirmButtonText: 'Bəli, Sil',
        cancelButtonText: 'İmtina',
      }).then((result) => {
        if (result.value) {
          tbody!.children[index].classList.add('selected-apartment');
          (this.floorEditForm.controls.flatList as FormArray).controls[index].get('deleted')?.setValue(true)
        }
      })
    }
  }

  deleteBuilding(id: string) {
    Swal.fire({
      title: 'Silmək isdədiyinizə əminsiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Bəli, Sil',
      cancelButtonText: 'İmtina',
    }).then((result) => {
      if (result.value) {
        this.buildingService.deleteBuilding(id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getBuildingList();
              this.toastrService.success(response.message);
            }
          })
      }
    })
  }

  consoleForm() {
    console.log(JSON.stringify(this.buildingAddForm.getRawValue()))
  }

  openApartmentEditModal(modal: any, apartment: BinaMenzilViewDto) {
    this.selectedApartment = apartment
    this.modalService.open(modal, {size: 'xl', scrollable: true})
  }

  closeModal() {
    this.modalService.dismissAll()
  }
}
