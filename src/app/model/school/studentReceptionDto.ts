import { ClassSection, ExamDto, Parent } from "./class.dto";
import {GenderDto} from "../organization/gender.dto";

export interface studentReceptionDto {
    id: string,
    contractNumber: string,
    firstName: string,
    secondName: string,
    gender: GenderDto,
    statusType: string,
    isContract: false,
    statusReason: string,
    note: string,
    classPrefix: number,
    exams: ExamDto[],
    dob: string,
    section: ClassSection,
    parents: Parent[],
}
