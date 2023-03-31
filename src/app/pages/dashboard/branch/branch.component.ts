import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {BranchService} from './branch.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss'],
})
export class BranchComponent implements OnInit {
  data: any = [];
  branch!: any;
  submitted = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  navs: any = [
    {
      id: 0,
      title: "Filial",
      status: true
    },
    {
      id: 1,
      title: "Təşkilati struktur",
      status: false
    },
    {
      id: 2,
      title: "Bina haqqında məlumat və şəkil",
      status: false
    },
    {
      id: 3,
      title: "Fəaliyyətə icazə sənədləri",
      status: false
    },
    {
      id: 4,
      title: "Əlaqə və ünvan",
      status: false
    }
  ]

  selectedClass = this.navs[0]


  BranchForm = new FormGroup({
    info: new FormControl('', [Validators.required]),
    adress: new FormControl(''),
    email: new FormControl(''),
    fax1: new FormControl(''),
    fax2: new FormControl(''),
    mob1: new FormControl(''),
    mob2: new FormControl(''),
    phone1: new FormControl(''),
    phone2: new FormControl(''),
    webPage: new FormControl(''),
  });

  constructor(
    private Service: BranchService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getBranches();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getBranches() {
    this.Service.getBranches('').subscribe((res: any) => {
      this.data = res.result;
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.BranchForm.controls;
  }
  async createBranch() {
    this.submitted=true;
    var data = {
      info: this.BranchForm.controls['info'].value,
      adress: this.BranchForm.controls['adress'].value,
      webPage: this.BranchForm.controls['webPage'].value,
      email: this.BranchForm.controls['email'].value,
      phone1: this.BranchForm.controls['phone1'].value,
      phone2: this.BranchForm.controls['phone2'].value,
      fax1: this.BranchForm.controls['fax1'].value,
      fax2: this.BranchForm.controls['fax2'].value,
      mob1: this.BranchForm.controls['mob1'].value,
      mob2: this.BranchForm.controls['mob2'].value,


    };

    if (!this.BranchForm.invalid) {
      let response = await this.Service.addBranch(data).toPromise();
      if (response) {
        this.toastr.success(response.message)
        this.onReset();
        this.getBranches();

      }
    }
  }


  async deleteBranch(branch: any) {
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
        this.Service.delBranch(branch.id)
          .toPromise()
          .then((response) => {
            if (response) {
              this.getBranches();
              this.toastr.success(response.message);
            }
          })

      }
    });
  }

  async editBranch() {
this.submitted=true;

    var data = {
      id: this.selectedBranch.id,
      info: this.BranchForm.controls['info'].value,
      adress: this.BranchForm.controls['adress'].value,
      email: this.BranchForm.controls['email'].value,
      fax1: this.BranchForm.controls['fax1'].value,
      fax2: this.BranchForm.controls['fax2'].value,
      mob1: this.BranchForm.controls['mob1'].value,
      mob2: this.BranchForm.controls['mob2'].value,
      phone1: this.BranchForm.controls['phone1'].value,
      phone2: this.BranchForm.controls['phone2'].value,
      webPage: this.BranchForm.controls['webPage'].value,
    };
    if (!this.BranchForm.invalid){
    let response = await this.Service.editBranch(data).toPromise();
    if (response) {
      this.toastr.success(response.message)
      this.onReset();
      this.getBranches();
      this.BranchForm.reset();
    }
    else
    {
      this.toastr.error(response.message)
    }
  }
  }

  selectedBranch: any = [];
 async selectBranch(branch: any) {
   console.log(branch.id)
    await this.Service.getBranchById(branch.id).toPromise().then(data=>
      {
        console.log(data.result);
        this.selectedBranch=data.result;
        console.log(this.selectedBranch);
      }).catch(err=>
        {
          this.toastr.error(err.message);
        })
    this.BranchForm.get('info')?.setValue(this.selectedBranch.info);
    this.BranchForm.get('adress')?.setValue(this.selectedBranch.adress);
    this.BranchForm.get('email')?.setValue(this.selectedBranch.email);
    this.BranchForm.get('fax1')?.setValue(this.selectedBranch.fax1);
    this.BranchForm.get('fax2')?.setValue(this.selectedBranch.fax2);
    this.BranchForm.get('mob1')?.setValue(this.selectedBranch.mob1);
    this.BranchForm.get('mob2')?.setValue(this.selectedBranch.mob2);
    this.BranchForm.get('phone1')?.setValue(this.selectedBranch.phone1);
    this.BranchForm.get('phone2')?.setValue(this.selectedBranch.phone2);
    this.BranchForm.get('webPage')?.setValue(this.selectedBranch.webPage);

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  onReset(): void {
    this.submitted = false;
    this.BranchForm.reset();
  }

  changeTab(nav: any) {
    this.navs.map((x: any) => x.status = false)
    console.log(this.navs)

    this.selectedClass = this.navs.filter((x: any) => {
      if (x.id === nav.id) {
        x.status = true
        return x
      }
    })[0]
  }
}
