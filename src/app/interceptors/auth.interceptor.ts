import { Injectable } from '@angular/core';
import {
 HttpRequest,
 HttpHandler,
 HttpEvent,
 HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, mergeMap, throwError, of, finalize, delay } from 'rxjs';
import { SharingServiceService } from '../services/sharing-service.service';
import { AppstateService } from '../services/appstate.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private shareService:SharingServiceService,
      private appstate:AppstateService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes('/login') || request.url.includes('/register') || 
    request.url.includes('/book/getBooks')) {
      return next.handle(request);
    }
    
      return this.getToken().pipe(
        mergeMap((token) => {
          request = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`)
          });
          return next.handle(request).pipe(
            delay(500),
            finalize(()=>this.appstate.LoadingOff()),
            catchError((error: any) => {
              if (error && error.status) {
                if (error.status === 401) {
                  console.log("Error: Unauthorized");
                }
              } else {
                return throwError(error);
              }
              return of(error);
            })
          );
        }
      )
      );
   }
  
   getToken(): Observable<string> {
      const token = this.shareService.getSetting().token;
      return of(token ? token : "");
   }
}
