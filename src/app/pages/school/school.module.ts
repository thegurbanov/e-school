import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClassesComponent } from './classes/classes.component';
import { EducationYearComponent } from './education-year/education-year.component';
import { JournalComponent } from './journal/journal.component';
import { PlansComponent } from './plans/plans.component';
import { ProgramsComponent } from './programs/programs.component';
import { SectionsComponent } from './sections/sections.component';
import { StudentsComponent } from './students/students.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TimelineComponent } from './timeline/timeline.component';
import { HelpersModule } from 'src/app/helpers/helpers.module';
import { JournalListComponent } from './journal-list/journal-list.component';
import { JournalPipe } from './journal/journal.pipe';
import { StudentReceptionComponent } from './student-reception/student-reception.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentReportComponent } from './student-report/student-report.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ClickOutsideModule } from 'ng-click-outside';
import { DailyJournalComponent } from './daily-journal/daily-journal.component';
import {AccountingModule} from "../accounting/accounting.module";
import { StudentReceptionExamComponent } from './student-reception-exam/student-reception-exam.component';
import {DashboardsModule} from "../dashboard/dashboards.module";
import { AdditionalLessonComponent } from './additional-lesson/additional-lesson.component';
import { FinalEvaluationComponent } from './final-evaluation/final-evaluation.component';
import {PagesModule} from "../pages.module";


@NgModule({
  declarations: [
    EducationYearComponent,
    SectionsComponent,
    ClassesComponent,
    StudentsComponent,
    SubjectsComponent,
    PlansComponent,
    ProgramsComponent,
    CalendarComponent,
    JournalComponent,
    TimelineComponent,
    JournalListComponent,
    JournalPipe,
    StudentReceptionComponent,
    StudentReportComponent,
    DailyJournalComponent,
    StudentReceptionExamComponent,
    AdditionalLessonComponent,
    FinalEvaluationComponent
  ],
    imports: [
        CommonModule,
        SchoolRoutingModule,
        SharedModule,
        HelpersModule,
        NgbNavModule,
        SimplebarAngularModule,
        ClickOutsideModule,
        PipesModule,
        AccountingModule,
        DashboardsModule,
        PagesModule
    ]
})
export class SchoolModule { }
