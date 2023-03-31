import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-excel-reader',
  templateUrl: './excel-reader.component.html',
  styleUrls: ['./excel-reader.component.scss']
})
export class ExcelReaderComponent implements OnInit {

  data!: [][];
  previewData: any

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      console.log(ws);

      this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));

      console.log(this.data);

      let x = this.data.slice(1);
      console.log(x);

    };

    reader.readAsBinaryString(target.files[0]);

  }

  openExcelReaderContent(excelReaderContent: any) {
    this.modalService.open(excelReaderContent, {scrollable: true, size: "xl"})
  }
}
