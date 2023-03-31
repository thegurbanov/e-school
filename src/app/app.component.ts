import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BaseResponse } from './model/base.dto';
import { ConfigService } from './services/general/config.service';
import { GeneralService } from './services/general/general.service';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Idrak liseyi';


  constructor(
    private updates: SwUpdate,
    private Service: GeneralService,
    private config: ConfigService,
    private TranslateService: TranslateService,
    public _cookiesService: CookieService,

  ) {


    this.updates.available.subscribe((event: any) => {
      document.location.reload();
    });
  }


  ngOnInit(): void {
    this.getLanguageKeys();
  }

  async getLanguageKeys() {
    let Lang = this._cookiesService.get('lang') ?? 'az';
    await this.Service.getLanguageKeys('').toPromise().then((response: BaseResponse<any>) => {
      if (response?.code == 200) {
        // this.config.LanguageKeys.next(response.result)

        // this.TranslateService.setTranslation(Lang, response.result);
        // this.TranslateService.setDefaultLang(Lang);
        // this.TranslateService.use(Lang);
      }
    })
  }
}
