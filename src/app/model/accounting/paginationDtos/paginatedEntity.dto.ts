import {PageableDto} from "./pageable.dto";
import {SortDto} from "./sort.dto";

export interface PaginatedEntityDto<T> {
  content: T[]
  pageable: PageableDto
  last: boolean
  totalPages: number
  totalElements?: number
  size: number
  sort: SortDto
  first: boolean
  numberOfElements: number
  number: number
  empty: boolean
}
