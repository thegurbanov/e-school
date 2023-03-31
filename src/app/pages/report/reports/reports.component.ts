import { Component, OnInit } from '@angular/core';
import { ReportDto } from "../../../model/report/report.dto";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReportsService } from './reports.service';
import { BaseResponse } from 'src/app/model/base.dto';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reportList: ReportDto[] = []
  ReportForm!: FormGroup;

  pageSizes: any = ["3", "4", "5"];

  pageRotates: any = [{
    id: "1",
    info: "Landscape",
  },
  {
    id: "0",
    info: "Portrait",
  }];


  constructor(private Service: ReportsService,
    private formBuilder: FormBuilder

  ) {

  }

  ngOnInit(): void {
    this.getReports();

    this.ReportForm = this.formBuilder.group({
      id: ['', Validators.required],
      pageSize: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      pageRotate: ['', Validators.required],
    });
  }


  reports: any = [];
  getReports() {
    this.Service.getReports('').toPromise().then((response: BaseResponse<ReportDto>) => {
      if (response?.code == 200) {
        this.reports = response.result
      }
    })

  }

  getReportById(report: ReportDto) {
    this.Service.getReportById(report?.id).toPromise().then((response: BaseResponse<ReportDto>) => {
      if (response?.code == 200) {
        this.ReportForm.patchValue({
          pageSize: response.result.pageSize.toString(),
          pageRotate: response.result.pageRotate.toString(),
        });
      }
    })
  }

  getReportFile(): any {
    this.Service.getReportFile(this.ReportForm.value);
  }




}
