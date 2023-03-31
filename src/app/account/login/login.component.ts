import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../core/services/auth.service';
import { LAYOUT_MODE } from '../../layouts/layouts.model';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from 'src/app/services/general/general.service';
import { BaseResponse } from 'src/app/model/base.dto';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;
  loginForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  layout_mode!: string;
  fieldTextType!: boolean;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private Service: GeneralService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private deviceService: DeviceDetectorService,
    private authenticationService: AuthenticationService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.layout_mode = LAYOUT_MODE;
    document.body.setAttribute("data-layout-mode", localStorage.getItem("theme") ?? 'light');

    this.getIp();

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      browser: [this.device?.browser, [Validators.required]],
      deviceType: [this.device?.deviceType, [Validators.required]],
      os_version: [this.device?.os_version, [Validators.required]],
      browser_version: [this.device?.browser_version, [Validators.required]],
      device: [this.device?.device, [Validators.required]],
      os: [this.device?.os, [Validators.required]],
      ip: ['', []],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    document.body.setAttribute('data-layout', 'vertical');
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {

      this.authenticationService.login(this.loginForm.value).then((response: any) => {
        if (response?.code == 200) {
          this.authenticationService?.setLogin(response.result);
          window.location.href = response.result?.user?.page ?? "/"
        }
      })
    }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  get device(): any {
    return this.deviceService.getDeviceInfo();
  }

  ip: string = ''
  async getIp() {
    await this.http.get("https://api.ipify.org/?format=json").toPromise().then((response: any) => {
      if (response)
        this.loginForm.controls["ip"].patchValue(response?.ip)
    })
  }



}
