import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginatedEntityDto} from "../../../model/accounting/paginationDtos/paginatedEntity.dto";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() paginatedData!: PaginatedEntityDto<any>
  @Output() changePageNumberEvent = new EventEmitter<number>()
  pageNumber: number = 1
  @Input() pageSize: number = 50
  @Input() changePageNumber!: () => void

  constructor() {
  }

  ngOnInit(): void {
  }

  sendPageNumber() {
    this.changePageNumberEvent.emit(this.pageNumber)
  }

}
