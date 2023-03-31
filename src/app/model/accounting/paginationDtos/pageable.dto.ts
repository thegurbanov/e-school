import {SortDto} from "./sort.dto";

export interface PageableDto {
  sort: SortDto
  offset: number
  pageSize: number
  pageNumber: number
  unpaged: boolean
  paged: boolean
}
