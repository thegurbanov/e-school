import { number } from "echarts"

export interface ReportDto {
  id: string
  info: string
  colCount: number
  fixedRows: number
  pageRotate: number
  pageSize: number

}
