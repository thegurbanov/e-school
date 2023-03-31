import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { BranchRoomService } from './branch-room.service';

@Component({
  selector: 'app-branch-room',
  templateUrl: './branch-room.component.html',
  styleUrls: ['./branch-room.component.scss']
})
export class BranchRoomComponent implements OnInit {

  branch!: any;
  data: any = [];
  submitted = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  form = new FormGroup({
    info: new FormControl('', [
      Validators.required
    ]),
    note: new FormControl(''),
  });

  constructor(
    private Service: BranchRoomService,
    private toastr: ToastrService
  ) { }
  formFieldHelpers: string[] = [''];
  ngOnInit(): void {
    this.getBranchRooms();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getBranchRooms() {
    this.Service.getBranchrooms('').subscribe((res: any) => {
      this.data = res.result;
    });
  }

  async add() {
    this.submitted = true;
    var data = {
      info: this.form.controls['info'].value,
      note: this.form.controls['note'].value,
    };
    if (!this.form.invalid) {
      let response = await this.Service.addBranchroom(data).toPromise();
      if (response) {
        this.getBranchRooms();
        if (response?.code == 200) {
          this.onReset();
          this.toastr.success(response.message);
        } else {
          this.toastr.error(response.message);
        }
      } else {
        this.toastr.error(response.message);
      }
    }
  }

  async delete(branch: any) {
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
        this.Service.delBranchroom(branch.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getBranchRooms();
              this.toastr.success(response.message);
            }
          })

      }
    });
  }

  async update() {
    this.submitted = true;
    var data = {
      id: this.selectedBranchroom.id,
      info: this.form.controls['info'].value,
      note: this.form.controls['note'].value,
    };
    let response = await this.Service.editBranchroom(data).toPromise();
    if (response) {
      this.getBranchRooms();
      if (response?.code == 200) {
        this.onReset();
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
    } else {
      this.toastr.error(response.message);
    }
  }

  selectedBranchroom: any = [];
  async selectBranchRoom(branch: any) {

    await this.Service.getBranchroomById(branch.id).toPromise().then(data => this.selectedBranchroom = data.result).catch(err => {
      this.toastr.error(err.message);
    })
    this.form.get('info')?.setValue(this.selectedBranchroom.info);
    this.form.get('note')?.setValue(this.selectedBranchroom.note);
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
