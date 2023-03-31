import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators';
import { StorageService } from '../services/storage/storage.service'
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private localStorageService: StorageService,
    private auth: AuthenticationService,
    private Notify: ToastrService) { }

  /**
   * Intercepts an outgoing HTTP request, executes it and handles any error that could be triggered in execution.
   * @see HttpInterceptor
   * @param req the outgoing HTTP request
   * @param next a HTTP request handler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError((error, caught) => {

        this.handleAuthError(error);
        return of(error);
      }) as any);
  }

  /**
* manage errors
* @param err
* @returns {any}
*/
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      this.Notify.error(err.error.message);
      console.log('handled error ' + err.status);
      setTimeout(() => {
        this.auth.logout()
      }, 1000);
    }
    if (err.status === 403) {
      console.log('handled error' + err.status);
    }

    if (err.status === 500) {
      this.Notify.error('Error', err.error.message,);
    }

    if (err.status === 400) {
      this.Notify.error(err.error.message)
    }

    return of(err);
  }
}

/**
 * Provider POJO for the interceptor
 */
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
