import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { mergeMap } from 'rxjs/operators';
import { FirebaseTokenRoutes } from './emums/firebase-token-routes';

@Injectable()
export class FirebaseInterceptor implements HttpInterceptor {
  constructor(private auth: AngularFireAuth) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.auth.idToken.pipe(
      mergeMap((token: string | null) => {
        if (token && this.isAFirebaseRoute(request.url)) {
          request = request.clone({
            url: request.url + `auth=${token}`,
          });
        }
        return next.handle(request);
      })
    );
  }

  public isAFirebaseRoute(route: string) {
    return Object.values(FirebaseTokenRoutes).some((searchTerm) =>
      route.includes(searchTerm)
    );
  }
}
