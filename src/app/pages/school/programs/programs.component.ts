import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EducationService} from '../education-year/education.service';
import {ProgramsService} from './programs.service';
import {ToastrService} from 'ngx-toastr';
import {SubjectsService} from '../subjects/subjects.service';
import {BaseResponse} from 'src/app/model/base.dto';
import {ClassSection, ClassYearly, Subject, Yearly} from 'src/app/model/school/class.dto';
import {ClassesService} from '../classes/classes.service';
import {SectionsService} from '../sections/sections.service';
import Swal from 'sweetalert2';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  ProgramForm!: FormGroup;
  program!: any;
  data: any = [];
  lessonTypes = [
    {
      id: "LESSON",
      info: "Dərs"
    },
    {
      id: "KSQ",
      info: "KSQ"
    },
    {
      id: "BSQ",
      info: "BSQ"
    },
  ]
  selectedLessonType = this.lessonTypes[0];

  constructor(private ProgramsService: ProgramsService,
              private YearService: EducationService,
              private SectionsService: SectionsService,
              private ClassesService: ClassesService,
              private SubjectService: SubjectsService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getYears();
  }

  createForm(){
    this.ProgramForm = this.formBuilder.group({
      id: null,
      subject: [null, Validators.required],
      classPrefix: [null, Validators.required],
      hour: [1, Validators.required],
      yearly: [[], Validators.required],
      tendency: [[], Validators.required],
      classSection: [[], Validators.required],
      lessonType: [[], Validators.required],
      info: ['', Validators.required],
      standart: ['', Validators.required],
      resources: ['', Validators.required],
      inteqrasiyya: ['', Validators.required],
    })
  }


  programs: any = []
  async getProgramsById() {
    let data = {
      yearID: this.selectedYear?.id,
      subjectID: this.selectedSubject?.id,
      tendencyID: this.selectedTendency?.id,
      classSectionId: this.selectedSection?.id,
      prefix: this.selectedClass,
      lessonType: this.selectedLessonType?.id
    }
    await this.ProgramsService.getProgramsByYear(data).toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.programs = response.result
      }
    })
  }

  async createProgram() {
    this.ProgramForm.controls['yearly'].setValue(this.year)
    this.ProgramForm.controls['classSection'].setValue(this.selectedSection)
    this.ProgramForm.controls['classPrefix'].setValue(this.selectedClass)
    this.ProgramForm.controls['tendency'].setValue(this.selectedTendency)
    this.ProgramForm.controls['subject'].setValue(this.selectedSubject)
    this.ProgramForm.controls['lessonType'].setValue(this.selectedLessonType.id)

    if (!this.ProgramForm.invalid) {
      await this.ProgramsService.addProgram(this.ProgramForm.value).toPromise().then((response: BaseResponse<any>) => {
        if (response?.code == 200) {
          this.toastr.success(response.message);
          this.resetForm();
          this.getProgramsById();
        }
      })
    }
    else {
      this.toastr.error("Məlumatları tam daxil edin.");
    }
  }

  resetForm() {
    this.ProgramForm.reset()
    this.ProgramForm.controls['hour'].setValue(1)
  }

  async delProgram(program: any) {
    Swal.fire({
      title: 'Silmək isdədiyinizə əminsiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Bəli, Sil',
      cancelButtonText: 'İmtina',
    }).then((result) => {
      if (result.value) {
        this.ProgramsService.delProgram(program.id)
          .toPromise()
          .then((response) => {
            if (response?.code == 200) {
              this.toastr.success(response.message);
              this.programs = response.result
            }
          })

      }
    });
  }

  async editProgram() {
    this.ProgramForm.controls['yearly'].setValue(this.year)
    this.ProgramForm.controls['id'].setValue(this.selectedProgram.id);
    this.ProgramForm.controls['classSection'].setValue(this.selectedSection)
    this.ProgramForm.controls['classPrefix'].setValue(this.selectedClass)
    this.ProgramForm.controls['tendency'].setValue(this.selectedTendency)
    this.ProgramForm.controls['subject'].setValue(this.selectedSubject)
    this.ProgramForm.controls['lessonType'].setValue(this.selectedLessonType.id)

    await this.ProgramsService.editProgram(this.ProgramForm.value).toPromise().then((response: BaseResponse<ClassYearly>) => {
      if (response?.code == 200) {
        this.programs = response?.result
        this.toastr.success(response?.message)
      }
    })
    this.resetForm()
  }


  selectedProgram: any = [];

  async getProgramById(program: any) {
    await this.ProgramsService.getProgramById(program.id).toPromise().then((resposne: BaseResponse<any>) => {
      if (resposne?.code == 200) {
        this.selectedProgram = resposne.result;
        this.ProgramForm.patchValue(resposne.result)
      }
    })
  }

  temayuls: any = [];
  async getAllTendency() {
    await this.ClassesService.getTendencyList('').toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.temayuls = response.result
        this.selectedTendency = this.temayuls[0]
      }
    }).then(() => {
      this.getProgramsById()
    })
  }


  year!: ClassYearly;
  years: any = [];
  selectedYear!: ClassYearly
  async getYears() {
    await this.YearService.getYears('').toPromise().then((response: BaseResponse<Yearly>) => {
      if (response?.code == 200) {
        this.years = response.result;
        this.year = this.years.find((year: Yearly) => year.isCurrent == true) ?? this.years[0];
        this.selectedYear = this.years.find((year: Yearly) => year.isCurrent == true) ?? this.years[0]

      }
    }).then(() => {
      this.getSubjects()
    })
  }

  selectCurrentYear(year: any) {
    this.year = this.years.find((x: any) => x.id == year.id);
  }

  selectedTendency: any;
  selectedSubject: any;
  counter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  subject: any = [];
  subjects: any = [];
  async getSubjects() {

    await this.SubjectService.getSubjects('').toPromise().then((response: BaseResponse<Subject>) => {
      if (response?.code == 200) {
        this.subjects = response.result;
        this.selectedSubject = this.subjects[0];
      }
    }).then(() => {
      this.getSections();


    })
  }

  section!: ClassSection;
  selectedSection!: ClassSection;
  sections: any = [];
  async getSections() {

    await this.SectionsService.getSections('').toPromise().then((response: BaseResponse<ClassSection>) => {
      if (response?.code == 200) {
        this.sections = response.result;
        this.selectedSection = this.sections[0];
      }
    }).then(() => {
      this.getAllTendency();

    })
  }

  selectedClass = 1
  classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  openScrollableModal(content: any, size: string) {
    this.modalService.open(content, {scrollable: true, size})
  }
}
