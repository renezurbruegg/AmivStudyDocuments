import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
/**
* Listens for error answers. If we get a 401 err (not authorized) the jwt token is no longer valid and the user needs to be logged out.
*/
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            console.log(err);
            if(!err){
              return;
            }
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
                //location.reload(true);
            }
            return throwError(err);
        }))
    }
}
