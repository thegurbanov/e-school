import {Student, Subject} from "./class.dto";

export interface studentReceptionExamDto {
    id: string,
    note: string,
    examResult: string,
    examQuestionCount: number,
    examAnsweredQuestionCount: number,
    examRightQuestionCount: number,
    test: boolean,
    student: Student,
    subject: Subject,
    teacher: Subject,
}
