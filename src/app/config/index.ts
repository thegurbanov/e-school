import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';
import { AppSettings } from '../config/app-config';
@Injectable()
export class Config {

    constructor(
        private http: HttpClient,
        private TranslateService: TranslateService,
        public _cookiesService: CookieService,
    ) { }

    Initialize() {

    }

    public TranslationInitialize = () => new Promise<boolean>((resolve: (res: boolean) => void) => {
        let Lang = this._cookiesService.get('lang') ?? 'az';
        localStorage.setItem("lang", Lang);
        moment.locale(Lang);
        this.http.get(`${AppSettings.BASE_URL}/main/api/v1/interface-language/interface`, {
            headers: {
                'Accept-Language': Lang
            }
        }
        ).toPromise().then((x: any) => {
            console.log(x)
            this.TranslateService.setTranslation(Lang, x.result);
            this.TranslateService.setDefaultLang(Lang);
            this.TranslateService.use(Lang);
            return resolve(true);
        })
    });

}
