import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditComponent } from './audit.component';
import { TableComponent } from 'src/app/layouts/table/table.component';
import { DatePipe } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AuditComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
  ],
  providers: [DatePipe]
})
export class AuditModule { }
