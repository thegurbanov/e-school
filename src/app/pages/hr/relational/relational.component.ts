import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {RelationalDto} from "../../../model/school/relational.dto";
import {GenderDto} from "../../../model/organization/gender.dto";
import {RelationalService} from "../../school/services/relational.service";
import {GenderService} from "../../dashboard/services/gender.service";

@Component({
  selector: 'app-relational',
  templateUrl: './relational.component.html',
  styleUrls: ['./relational.component.scss']
})
export class RelationalComponent implements OnInit {

  relationalshipList: RelationalDto[] = []
  form!: FormGroup
  selectedRelationalship!: RelationalDto
  genders: GenderDto [] = []

  constructor(private relationalService: RelationalService,
              private toastrService: ToastrService,
              private genderService: GenderService) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getRelationalships()
    this.getGenderList()
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl({value: '', disabled: true}),
      info: new FormControl('', [Validators.required]),
      genderId: new FormControl('')
    })
  }

  getGenderList() {
    this.genderService.getList().toPromise().then(response => {
      if (response?.code === "200") {
        this.genders = response?.result
      }
    })
  }

  get validation(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  resetForm() {
    //@ts-ignore
    this.selectedRelationalship = undefined
    this.form.reset()
  }

  add() {
    const formControls = this.form.controls
    const body: any = {
      "gender": {id: formControls['genderId'].value},
      "info": formControls['info'].value
    }

    this.relationalService.addRelationalShip(body).toPromise().then(response => {
      if (response?.code === "200") {
        this.toastrService.success(response?.message)
        this.getRelationalships()
        this.resetForm()
      }
    })


  }

  deleteLessonById(id: number) {

    Swal.fire({
      title: 'Silmək istədiyinizə əminsiniz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Bəli',
      cancelButtonText: 'İmtina',
    }).then((result) => {
      if (result.value) {
        this.relationalService.deleteRelationalShipById(id).toPromise().then(response => {
          if (response?.code === "200") {
            this.toastrService.success(response?.message)
          }
        })
      }
    })
  }

  setAdditonalLessonDataToForm() {
    this.form.patchValue(this.selectedRelationalship)
    this.form.controls['genderId'].setValue(this.selectedRelationalship.gender.id)
  }

  getRelationalships() {
    this.relationalService.getRelationalShipList().toPromise().then(response => {
      if (response?.code === "200") {
        this.relationalshipList = response?.result
      }
    })
  }

  getRelationalshipInfo(relational: RelationalDto) {
    this.relationalService.getRelationalShipById(relational.id).toPromise().then(response => {
      if (response?.code === "200") {
        this.selectedRelationalship = response?.result
        this.setAdditonalLessonDataToForm()
      }
    })
  }

  update() {
    const formControls = this.form.controls
    const body: any = {
      "id": formControls['id'].value,
      "gender": {id: formControls['genderId'].value},
      "info": formControls['info'].value
    }

    this.relationalService.updateRelationalShip(body).toPromise().then(response => {
      if (response?.code === "200") {
        this.toastrService.success(response?.message)
        this.getRelationalships()
        this.resetForm()
      }
    })
  }
}
