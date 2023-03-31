import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {EducationService} from '../education-year/education.service';
import {PlansService} from './plans.service';
import {SectionsService} from '../sections/sections.service';
import {ClassesService} from '../classes/classes.service';
import {ToastrService} from 'ngx-toastr';
import {SubjectsService} from '../subjects/subjects.service';
import {ClassYearly, ClassYearlyEducationPlan, Plan, Subject, Yearly} from 'src/app/model/school/class.dto';
import {BaseResponse} from 'src/app/model/base.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  plan!: any;
  PlanForm!: FormGroup;
  data: any = [];

  constructor(
    private PlansService: PlansService,
    private YearService: EducationService,
    private ClassesService: ClassesService,
    private SectionsService: SectionsService,
    private formBuilder: FormBuilder,
    private SubjectService: SubjectsService,
    private toastr: ToastrService
  ) {
    this.PlanForm = this.formBuilder.group({
      id: null,
      classPrefix: new FormControl("", [Validators.required]),
      weeklyHour: new FormControl([], [Validators.required]),
      tendency: new FormControl(null, [Validators.required]),
      subject: new FormControl(null, [Validators.required]),
      classSection: new FormControl("", [Validators.required]),
    });
  }
  submitted = false;

  ngOnInit(): void {
    this.getYears();
    this.getSections();
    this.getSubjects();
    this.getAllTendency();
  }



  temayuls: any = [];
  async getAllTendency() {

    await this.ClassesService.getTendencyList('').toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.temayuls = response.result;
      }
    })
  }

  plans: any = [];
  allPlans: any = [];
  async getPlansByYear(year: any) {
    this.year = year;
    await this.PlansService.getPlansByYear(year.id).toPromise().then((response: BaseResponse<Plan>) => {
      if (response?.code == 200) {
        this.plans = response.result;
        this.allPlans = response.result
      }
    })
  }

  selectedPlan?: ClassYearlyEducationPlan;
  async getProgramById(plan: ClassYearlyEducationPlan) {
    await this.PlansService.getPlanById(plan.id).toPromise().then((response: BaseResponse<ClassYearlyEducationPlan>) => {
      if (response?.code == 200) {
        this.selectedPlan = response.result;
        this.PlanForm.patchValue(response.result)
      }
    })
  }

  async add() {
    this.submitted = true;
    if (this.PlanForm.valid && this.submitted) {
      await this.PlansService.addPlan(this.PlanForm.value).toPromise().then((response: BaseResponse<ClassYearlyEducationPlan>) => {
        if (response?.code == 200) {
          this.PlanForm.reset();
          this.allPlans = response.result;
          this.filter();
          this.toastr.success(response.message);
        }
      })
      this.submitted = false;
    }
  }

  async update() {
    this.submitted = true;
    console.log(this.PlanForm.valid)
    if (this.PlanForm.valid) {
      await this.PlansService.editPlan(this.PlanForm.value).toPromise().then((response: BaseResponse<ClassYearlyEducationPlan>) => {
        if (response?.code == 200) {
          this.PlanForm.reset();
          this.submitted = false;
          this.toastr.success(response.message);
          this.allPlans = response.result;
          this.filter();
        }
      })
    }
  }


  async delete(year: any) {
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
        this.PlansService.delPlan(year.id)
          .toPromise()
          .then((response) => {
            if (response?.code == 200) {
              this.toastr.success(response.message);
              this.allPlans = response.result;
              this.filter()
            }
          })
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.PlanForm.controls;
  }

  section: any;
  sections: any = [];
  async getSections() {
    await this.SectionsService.getSections('').toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        this.sections = response.result;
      }
    })
  }

  subjects: any = [];
  async getSubjects() {
    await this.SubjectService.getSubjects('').toPromise().then((response: BaseResponse<Subject>) => {

      if (response?.code == 200) {
        this.subjects = response.result;
      }
    })

  }

  year: any = [];
  years: any = [];
  async getYears() {
    await this.YearService.getYears('').toPromise().then((response: BaseResponse<ClassYearly>) => {
      if (response?.code == 200) {
        this.years = response.result;
        this.year = this.years.find((year: Yearly) => year.isCurrent == true) ?? this.years[0]
        this.getPlansByYear(this.year);
        this.PlanForm.get('yearly')?.patchValue(this.year);
      }
    })
  }

  selectCurrentYear(year: any) {
    this.year = this.years.find((x: any) => x.id == year.id);
    this.getPlansByYear(this.year);
  }



  selectedTendency: any;
  selectedSubject: any
  filter() {

    this.plans = this.allPlans
    if (this.section) {
      this.plans = this.plans.filter((plan: Plan) => plan.classSection.info == this.section.info)
    }
    if (this.selectedClass) {
      this.plans = this.plans.filter((plan: Plan) => plan.classPrefix == this.selectedClass)
    }
    if (this.selectedTendency) {
      this.plans = this.plans.filter((plan: Plan) => plan.tendency.id == this.selectedTendency.id)
    }
    if (this.selectedSubject) {
      this.plans = this.plans.filter((plan: Plan) => plan.subject.id == this.selectedSubject.id)
    }
  }

  selectedClass!: number
  counter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
}
