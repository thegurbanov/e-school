import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganizationsService } from '../organizations/organizations.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  data: any = [];
  organization!:any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  OrganizationForm = new FormGroup({
    info: new FormControl('', [Validators.required,Validators.minLength(2)])
  });

  constructor(private Service: OrganizationsService) {
  }

  ngOnInit(): void {
    this.getOrganization();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getOrganization() {
    this.Service.getOrganizations('').subscribe((res: any) => {
      this.data = res.result
    })
  }

  async createOrganization() {
    var data = {
      info: this.OrganizationForm.controls['info'].value,
    }

    if (!this.OrganizationForm.invalid) {
      let response = (await this.Service.addOrganization(data).toPromise())
      if (response) {
        this.OrganizationForm.reset();
        this.getOrganization();
      }
    }
  }

  async delOrganization(organization: any) {
    let response = (await this.Service.delOrganization(organization.id).toPromise())
    if (response) {
      this.getOrganization();
    }
  }

  async editOrganization() {
    var data = {
      id: this.selectedOrganization.id,
      info: this.OrganizationForm.controls['info'].value
    }
    let response = (await this.Service.editOrganization(data).toPromise())
    if (response) {
      this.getOrganization();
      this.OrganizationForm.reset();
    }
  }

  selectedOrganization: any = [];
  selectOrganization(organization: any) {
    this.selectedOrganization = organization
    this.OrganizationForm.get('info')?.setValue(organization.info)
  }



    ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}

