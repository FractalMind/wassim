import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          //Server side errors
          let errorMessage =
            'While performing and action an error occurred. Please try again later.';
          switch (error.status) {
            case 0:
              errorMessage =
                'Network error. Please check your internet connection and try again.';
              break;
            case 400:
              errorMessage =
                'The request is malformed. Please try again with other values or contact the support team.';
              break;
            case 401:
              errorMessage =
                "You don't have the right permission to access this resource. Please try again with another user or contact the support team.";
              break;
            case 402:
              errorMessage =
                'Payment account overdue. Please visit the billing page to resolve this issue.';
              break;
            case 409:
              errorMessage = 'Conflict 410 Gone. Please try again.';
              break;
          }
          this._snackBar.open(errorMessage, 'Ok', {
            horizontalPosition: 'start',
            verticalPosition: 'top',
            panelClass: 'app-notification-error',
          });
          return throwError(() => new Error(errorMessage));
        }
        return throwError(() => error);
      })
    );
  }
}
