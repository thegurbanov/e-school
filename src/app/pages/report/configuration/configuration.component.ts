import {Component, OnInit} from '@angular/core';
import {ReportDto} from "../../../model/report/report.dto";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {ReportColumnService} from "../services/report-column.service";
import {ReportService} from "../services/report.service";
import {ReportColumnDto} from "../../../model/report/reportColumn.dto";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  reportList: ReportDto[] = []
  reportColumnList: ReportColumnDto[] = []
  form!: FormGroup
  selectedReport!: ReportDto;
  selectedReportColumn!: ReportColumnDto

  constructor(private reportColumnService: ReportColumnService,
              private toastrService: ToastrService,
              private reportServive: ReportService) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getReportList()
  }

  getReportList() {
    this.reportServive.getList().toPromise().then(success => {
      if (success?.code === "200") {
        this.reportList = success?.result
      }
    })
  }

  getReportsColumnsByReportId(reportId: string) {
    this.reportColumnService.getListByReportId(reportId).toPromise().then(success => {
      if (success?.code === "200") {
        this.reportColumnList = success?.result
      }
    })
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl(''),
      info: new FormControl('', [Validators.required])
    })
  }

  get validation(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  selectReport(id: string) {
    this.reportServive.getById(id).toPromise().then(success => {
      if (success?.code === "200") {
        this.selectedReport = success?.result
        this.form.setValue(this.selectedReport)
      }
    })
  }

  reset() {
    this.form.reset()
    //@ts-ignore
    this.selectedReport = undefined
  }

  update() {
    if (this.form.valid) {
      this.reportColumnService.update(this.form.value).toPromise().then(success => {
        if (success?.code === "200") {
          this.toastrService.success(success?.message)
          this.reset()
          this.getReportList()
        }
      })
    }
  }

  add() {
    if (this.form.valid) {
      this.reportColumnService.add(this.form.value).toPromise().then(success => {
        if (success?.code === "200") {
          this.toastrService.success(success?.message)
          this.reset()
          this.getReportList()
        }
      })
    }
  }

  isFormUpdatable() {
    return this.selectedReport !== undefined
  }

  deleteById(id: string) {
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
        this.reportColumnService.deleteById(id).toPromise().then(success => {
          if (success?.code === "200") {
            this.reset()
            this.toastrService.success(success.message)
            this.getReportList()
          }
        })
      }
    })
  }

}
