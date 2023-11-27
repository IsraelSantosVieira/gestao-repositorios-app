import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/services/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    /**
     * Constructor
     */
    constructor(
      private _authService: AuthService,
      private _router: Router
    )
    {
    }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        // Clone the request object
        let newReq = req.clone();

        if ( this._authService.accessToken && !AuthUtils.isTokenExpired(this._authService.accessToken) )
        {
            newReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this._authService.accessToken),
            });
        }

        // Response
        // @ts-ignore
        return next(newReq).pipe(
          catchError((error) =>
          {
              // Catch "401 Unauthorized" responses
              if ( error instanceof HttpErrorResponse && error.status === 401 )
              {
                  // Sign out
                  this._authService.signOut();

                  // Reload the app
                  location.reload();
              }

              if ( error instanceof HttpErrorResponse && error.status === 404 )
              {
                  // Send user to 404 page
                  this._router.navigate(['404-not-found']);
              }

              return throwError(error);
          }),
        );
    };
}
