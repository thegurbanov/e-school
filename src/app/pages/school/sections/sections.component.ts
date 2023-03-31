import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { SectionsService } from './sections.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {
  section!: any;
  data: any = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  SectionForm!: FormGroup;

  constructor(
    private Service: SectionsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.SectionForm = this.formBuilder.group({
      info: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getSections();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getSections() {
    this.Service.getSections('').subscribe((res: any) => {
      this.data = res.result;
    });
  }

  async createSection() {
    var data = {
      info: this.SectionForm.controls['info'].value,
    };

    if (!this.SectionForm.invalid) {
      let response = await this.Service.addSection(data).toPromise();
      if (response) {
        this.SectionForm.reset();
        this.getSections();
      }
    }
  }
  async delSection(section: any) {
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
        this.Service.delSection(section.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getSections();
              this.toastr.success('Sektor cədvəldən silindi');
            }
          })

      }
    });
  }


  async editSection() {
    var data = {
      id: this.selectedSection.id,
      info: this.SectionForm.controls['info'].value,
    };
    let response = await this.Service.editSection(data).toPromise();
    if (response) {
      this.getSections();
      this.SectionForm.reset();
    }
  }

  selectedSection: any = [];
  selectSection(section: any) {
    this.selectedSection = section;
    this.SectionForm.get('info')?.setValue(section.info);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
