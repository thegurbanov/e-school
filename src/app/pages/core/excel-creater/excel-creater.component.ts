import {Component, Input, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-creater',
  templateUrl: './excel-creater.component.html',
  styleUrls: ['./excel-creater.component.scss']
})
export class ExcelCreaterComponent implements OnInit {

  @Input() fileName = 'ExcelSheet.xlsx';
  @Input() tableElement!: any

  constructor() {
  }

  ngOnInit(): void {
  }


  exportexcel(): void {
    /* table id is passed over here */
    // let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableElement);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
