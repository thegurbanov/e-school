import { Employee } from "../organization/employee.dto";
import { LessonHour, Subject } from "./class.dto";

export interface dailyJournalData {
    id: string,
    employee: Employee,
    homeTask: string,
    lessonDay: string,
    lessonHour: LessonHour,
    subject: Subject,
    topic: any
}
