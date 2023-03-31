import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseResponse } from 'src/app/model/base.dto';
import { GeneralService } from 'src/app/services/general/general.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() columns: any = [];
  @Input() columns2: any = [];
  @Input() url!: any;
  @Input() length: any = [20, 50, 100];
  @Input() dataSource: any = [];
  @Input() selectname!: string;
  @Output() dataChange = new EventEmitter<string>();

  loader: boolean = false;
  page: any = 0;
  size!: any;
  selectedPage: any = 1;
  data: any;
  constructor(private Service: GeneralService,
    private datepipe: DatePipe,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.size = this.length[0]
    this.getData();
  }
  selectedData: any;
  selectData(data: any) {
    this.dataChange.emit(data);
    this.selectedData = data;
  }


  totalPage!: number;
  totalRow!: number;
  datas: any = [];
  async getData() {
    this.loader = true;
    let data = {
      page: this.page,
      size: this.size
    }
    await this.Service.getData(this.url, data).toPromise().then((response: BaseResponse<any>) => {
      if (response && response?.code == 200) {
        this.loader = false;
        this.dataSource = response?.result?.content;
        this.dataSource.filter((x: any) => {
          if (x.insertTime) {
            x.insertTime = this.datepipe.transform(x.insertTime, 'dd.MM.yyyy H:mm')
          }
        })
        this.totalPage = response?.result?.totalPages;
        this.totalRow = response?.result?.totalElements;
        this.getPages(response?.result?.totalPages)

      }
    })

  }


  pages: any = [];
  lastPage!: number;
  getPages(total: any) {
    if (total) {
      this.pages = Array(+total).fill(0).map((x, i) => ({ id: (i + 1), size: this.size, page: i }));
      console.log(this.pages)
      this.lastPage = this.pages[this.pages.length - 1]?.id;
      this.totalPage = total;
    }
  }
  items = [];
  pageOfItems!: Array<any>;
  changePage(type: string, id: any) {
    if (type == 'prev') {
      if (this.selectedPage > 1 && id != 1) {
        id--;
      }
    }
    else {
      if (this.selectedPage < this.totalPage && id != this.totalPage) {
        id++;
      }
    }
    window.scroll(0, 0);
    this.page = this.pages.find((x: any) => x.id == id)?.page;
    this.size = this.pages.find((x: any) => x.id == id)?.size;
    this.selectedPage = id
    this.getData();
  }

}
