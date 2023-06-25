import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const API_BASE_URL = 'https://the-sneaker-database.p.rapidapi.com/';
    const finalReq = req.clone({
      headers: req.headers
        .set(
          'X-RapidAPI-Key',
          'af319737famsh3a091093383d3acp159534jsn4bc490a0dbb1'
        )
        .set('X-RapidAPI-Host', 'the-sneaker-database.p.rapidapi.com'),
      url: API_BASE_URL + req.url,
    });
    return next.handle(finalReq);
  }
}
