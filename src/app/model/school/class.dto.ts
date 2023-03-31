import { Department, Employee } from "../organization/employee.dto";

export interface Yearly {
    id: string;
    info: string;
    startYear: string;
    endYear: string;
    isCurrent: boolean;
}

export interface ClassSection {
    id: string,
    info: string;
}
export interface RelationalShip {
    id: string,
    info: string;
}
export interface ExamDto {
    id: number,
    info: string,
    subject: Subject
}

export interface ClassSchool {
    id: string;
    info: string;
    section: ClassSection;
}

export interface ClassYearly {
    id: string;
    classPrefix: number;
    utis: string;
    classPrefixIndicator: string;
    classSchool: ClassSchool;
    header: Teacher;
    section: ClassSection;
    branchRoom: branchRoom;
    tendency: number;
}
export interface branchRoom {
    id: string;
    info: string;
}
export interface Date {
    dates: {
        lessonDay: string;
        subjects: Subject
    }
}

export interface Journal {
    id: string;
    info: string;
    classYearly: ClassYearly;
    subject: Subject;
    week: Week;
    teacher: Teacher
}

export interface Subject {
    id: string;
    info: string;
}
export interface Teacher {
    id: string;
    firstName: string;
    secondName: string;
    fatherName: string;
    fullName: string;
    department: Department;
    tabel: any
}
export interface Student {
    id: string;
    firstName: string;
    secondName: string;
    fatherName: string;
    motherName: string;
    fullName: string;
    tabel: any
    subject: Subject;
    classPrefix: number;
    section: ClassSection;
}
export interface Parent {
    id: string;
    firstName: string;
    secondName: string;
    fatherName: string;
    fullName: string;
    child: Student;
    tabel: any
}

export interface SubjectEmployee {
    id: string;
    subject: Subject;
    employee: Employee;
}
export interface EducationYear {
    id: string
    info: string,
    startYear: string,
    endYear: string,
}

export interface ClassYearlyEducationPlan {
    id: string;
    classPrefix: number;
    yearly: Yearly;
    classSection: ClassSection;
    subject: Subject;
    weeklyHour: number;
    tendency: any;
}

export interface LessonHour {
    id: string;
    row: number;
    info: string;
    startHour: string;
    endHour: string;
}

export interface Topic {
    id: string;
    info: string;
}


export interface Plan {
    classPrefix: number
    classSection: ClassSection
    id: string
    subject: Subject
    tendency: any;
    weeklyHour: number
    yearly: Yearly
}

export interface Week {
    id: string
    info: string
    endWeek: string
    isCurrent: boolean
    startWeek: string
}
