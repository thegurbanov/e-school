import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform} from 'ngx-image-cropper';
import {ToastrService} from 'ngx-toastr';
import {BaseResponse} from 'src/app/model/base.dto';
import {Department, Employee} from 'src/app/model/organization/employee.dto';
import {EmployeesService} from '../employees/employees.service';
import {BranchService} from "../../dashboard/branch/branch.service";
import {DepartmentsService} from "../departments/departments.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {


  submitted = false;
  EmployeeForm!: FormGroup;
  genders: any = [{
    id: 1,
    info: "Kişi"
  },
    {
      id: 2,
      info: "Qadın"
    },
  ]

  departments: Department[] = []

  constructor(
    private formBuilder: FormBuilder,
    private Service: EmployeesService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private departmentsService: DepartmentsService
  ) {
    this.EmployeeForm = this.formBuilder.group({
      id: [''],
      fatherName: ['', [Validators.required, Validators.min(2), Validators.max(50)],],
      firstName: ['', [Validators.required, Validators.min(2), Validators.max(50)],],
      secondName: ['', [Validators.required, Validators.min(2), Validators.max(50)],],
      gender: ['', Validators.required],
      dob: [''],
      photo: [''],
      department: ['', Validators.required],
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.getEmployeeById(params.id)
      }
    });
  }

  ngOnInit(): void {
    this.getDepartmentList()
  }

  getDepartmentList() {
    this.departmentsService.getDepartments(null).toPromise().then(response => {
      if (response?.code === "200") {
        this.departments = response?.result
      }
    })
  }


  get f(): { [key: string]: AbstractControl } {
    return this.EmployeeForm.controls;
  }


  employeeId!: string;

  async addOrUpdate() {
    this.submitted = true;
    if (this.EmployeeForm.valid) {
      if (this.EmployeeForm.controls["id"].value) {
        await this.Service.editEmployee(this.EmployeeForm.value)
          .toPromise()
          .then((response: BaseResponse<Employee>) => {
            if (response?.code == 200) {
              this.toastr.success(response.message);
            }
          })
      }
      else {
        await this.Service.addEmployee(this.EmployeeForm.value).toPromise().then((response: BaseResponse<Employee>) => {
          if (response?.code == 200) {
            this.EmployeeForm.patchValue(response.result);
            this.employeeId = this.EmployeeForm.controls["id"].value
            this.toastr.success(response.message);
          }
        })
      }
      this.submitted = false;
    }
  }

  onReset(): void {
    this.submitted = false;
    this.EmployeeForm.reset();
  }

  async getEmployeeById(id: string) {
    await this.Service.getEmployeeById(id).toPromise().then((response: BaseResponse<Employee>) => {
      if (response?.code == 200) {
        this.EmployeeForm.patchValue(response.result);
        this.employeeId = this.EmployeeForm.controls["id"].value
      }
    })
  }


  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event, base64ToFile(event.base64 ?? ""));
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }



  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }


  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }
}
