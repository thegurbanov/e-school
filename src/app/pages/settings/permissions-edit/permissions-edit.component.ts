import {Component, OnInit} from '@angular/core';
import {PermissionService} from "../services/permission.service";
import {PermissionEditDto} from "../../../model/settings/permissionEdit.dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-permissions-edit',
  templateUrl: './permissions-edit.component.html',
  styleUrls: ['./permissions-edit.component.scss']
})
export class PermissionsEditComponent implements OnInit {

  permissionList: PermissionEditDto[] = []
  form!: FormGroup
  selectedPermission!: PermissionEditDto
  permissionFilterText: string = '';

  constructor(private permissonService: PermissionService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getAllPermissionList()
  }

  createForm() {
    this.form = new FormGroup({
      code: new FormControl('', [Validators.required]),
      aze: new FormControl(''),
      eng: new FormControl(''),
      tur: new FormControl(''),
      rus: new FormControl(''),
      deu: new FormControl(''),
      spa: new FormControl(''),
      ita: new FormControl(''),
      fra: new FormControl(''),
    })
  }

  getAllPermissionList() {
    this.permissonService.getAll().toPromise().then(response => {
      if (response?.code === "200") {
        this.permissionList = response?.result
      }
    })
  }

  get validation() {
    return this.form.controls
  }

  getByCode(code: string) {
    const permissionByCode = this.permissionList.filter((x: PermissionEditDto) => x.code === code)[0]
    this.selectedPermission = permissionByCode
    this.form.patchValue(permissionByCode)
  }

  update() {
    this.permissonService.update(this.form.value).toPromise().then(response => {
      if (response?.code === "200") {
        this.toastrService.success(response?.message)
        this.getAllPermissionList()
        this.form.reset()
      }
    })
  }
}
