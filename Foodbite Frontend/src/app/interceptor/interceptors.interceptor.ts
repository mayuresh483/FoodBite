import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../services/loading.service';

var pendingRequests = 0;
@Injectable()
export class InterceptorsInterceptor implements HttpInterceptor {

  constructor(private loadingService:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.showLoading();
    pendingRequests++;

    return next.handle(request).pipe(
      tap(
        {
          next:(event)=>{
            if(event.type === HttpEventType.Response){
              pendingRequests--;
              if(pendingRequests==0)
              this.loadingService.hideLoading();
            }
          },error:(_)=>{
            pendingRequests--;
              if(pendingRequests==0)
              this.loadingService.hideLoading();
          }

        })
    );
  }
}
