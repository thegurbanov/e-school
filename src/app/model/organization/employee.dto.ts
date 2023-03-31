export interface Employee {
    id: string;
    secondName: string;
    firstName: string;
    fatherName: string;
    fullName: string;
    tabel: string;
    department: Department;
}

export interface Department {
    id: string;
    info: string;
}