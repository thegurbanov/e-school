import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {BaseResponse} from 'src/app/model/base.dto';
import {studentReceptionExamDto} from 'src/app/model/school/studentReceptionExamDto';
import {StudentsReceptionExamService} from './student-reception-examservice';

@Component({
  selector: 'app-student-reception-exam',
  templateUrl: './student-reception-exam.component.html',
  styleUrls: ['./student-reception-exam.component.scss']
})
export class StudentReceptionExamComponent implements OnInit {

  StudentReceptionExamForm!: FormGroup;
  submitted: boolean = false;

  constructor(private Service: StudentsReceptionExamService,
              private fb: FormBuilder,
              private toastr: ToastrService,
  ) {
  }

  createForm() {
    this.StudentReceptionExamForm = this.fb.group({
      id: [],
      note: ['', Validators.required],
      type: ['']
    });
  }


  ngOnInit(): void {
    this.createForm()
    this.getStudents();
  }

  get examControls(): { [key: string]: AbstractControl } {
    return this.StudentReceptionExamForm.controls;
  }

  exams: any = [];
  exam!: studentReceptionExamDto;

  async getStudents() {
    await this.Service.getExams('').toPromise().then((response: BaseResponse<studentReceptionExamDto>) => {
      if (response?.code == 200) {
        this.exams = response.result;
      }
    })
  }

  selectedExam!: studentReceptionExamDto | any;
  update() {
    this.submitted = true

    if (this.StudentReceptionExamForm.valid) {

      this.Service.updateExam(this.StudentReceptionExamForm.value).toPromise().then((response: BaseResponse<studentReceptionExamDto>) => {
        if (response?.code == 200) {
          this.exams = response.result;
          this.toastr.success(response.message);
          this.submitted = false;
          this.selectedExam = null
          this.StudentReceptionExamForm.reset()
        }
      })
    }
  }


  getExamById(exam: any) {
    this.selectedExam = exam
    this.StudentReceptionExamForm.controls['note'].setValue(this.selectedExam?.body?.note)
    this.StudentReceptionExamForm.controls['type'].setValue(this.selectedExam?.type)
    this.StudentReceptionExamForm.controls['id'].setValue(this.selectedExam?.body?.id)
  }
}
