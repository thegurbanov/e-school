import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CalendarComponent} from './calendar/calendar.component';
import {ClassesComponent} from './classes/classes.component';
import {EducationYearComponent} from './education-year/education-year.component';
import {JournalListComponent} from './journal-list/journal-list.component';
import {JournalComponent} from './journal/journal.component';
import {PlansComponent} from './plans/plans.component';
import {ProgramsComponent} from './programs/programs.component';
import {SectionsComponent} from './sections/sections.component';
import {StudentReceptionComponent} from './student-reception/student-reception.component';
import {StudentsComponent} from './students/students.component';
import {StudentReportComponent} from './student-report/student-report.component';
import {SubjectsComponent} from './subjects/subjects.component';
import {TimelineComponent} from './timeline/timeline.component';
import {DailyJournalComponent} from './daily-journal/daily-journal.component';
import {StudentReceptionExamComponent} from './student-reception-exam/student-reception-exam.component';
import {AdditionalLessonComponent} from "./additional-lesson/additional-lesson.component";
import {FinalEvaluationComponent} from "./final-evaluation/final-evaluation.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'education-year', component: EducationYearComponent},
      {path: 'sections', component: SectionsComponent},
      {path: 'classes', component: ClassesComponent},
      {path: 'customer', component: StudentsComponent},
      {path: 'subjects', component: SubjectsComponent},
      {path: 'plans', component: PlansComponent},
      {path: 'calendar', component: CalendarComponent},
      {path: 'calendar/:classID', component: CalendarComponent},
      {path: 'programs', component: ProgramsComponent},
      {path: 'timeline', component: TimelineComponent},
      {path: 'journal-list', component: JournalListComponent},
      {path: 'student-reception', component: StudentReceptionComponent},
      {path: 'student-reception-exam', component: StudentReceptionExamComponent},
      {path: 'contracts', component: StudentReportComponent},
      {path: 'journal-list-daily', component: DailyJournalComponent},
      {path: 'journal/yearly/:classID/:subjectID/:teacherID/:yearlyId', component: JournalComponent},
      {path: 'additional-lesson', component: AdditionalLessonComponent},
      {path: 'final-evaluation/:classId', component: FinalEvaluationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
