import { HttpContext, HttpEvent, HttpHandler, HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export  class HttpTokenInterceptor implements HttpTokenInterceptor  {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headersConfig:any ={
        'Accept': 'application/json'
    };
    const idToken = localStorage.getItem("token");

    if (idToken) {
        headersConfig['Authorization'] = idToken;
        let request = req.clone({
            setHeaders: headersConfig
        });
        return next.handle(request);
    }
    else {
        return next.handle(req)
    }
   // authorization with jwt token
    //const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // if (currentUser && currentUser.token) {
      //let request = req.clone({
           // setHeaders: {
              // Authorization: `Bearer ${currentUser.token}`
          // }
      // });
    // }

    //return next.handle(req);
}
}



