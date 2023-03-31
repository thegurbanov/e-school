import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPipe } from './search/search.pipe';
import { AgreementSidePipe } from './contract/agreement-side.pipe';



@NgModule({
    declarations: [
        SearchPipe,
        AgreementSidePipe,
    ],
    exports: [
        SearchPipe,
        AgreementSidePipe,
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule { }
