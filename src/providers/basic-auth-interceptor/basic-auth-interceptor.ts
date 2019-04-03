import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User, UserDataProvider} from "../user-data/user-data";
import 'rxjs/add/operator/mergeMap';


/*
  Generated class for the BasicAuthInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class BasicAuthInterceptorProvider implements HttpInterceptor {

  user: any;
  password: any;

  constructor(public  userData: UserDataProvider) {
  }

  intercept(request: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    return this.userData.getUserForLogin()
      .mergeMap((user: User) => {
        request = request.clone({
          setHeaders: {
            Authorization: "Basic " + btoa(
              user.username + ':' + user.password)
          }
        });
        return next.handle(request)
      });
  }

}
