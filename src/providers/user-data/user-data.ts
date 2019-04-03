import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Events} from "ionic-angular";
import 'rxjs/add/observable/fromPromise';
import {Observable} from "rxjs/Observable";


@Injectable()
export class UserDataProvider {

  private user: User = new User();

  HAS_LOGGED_IN = 'hasLoggedIn';
  USER_OBJECT = 'UPMSCOREOBJECT';


  constructor(public storage: Storage,
              public events: Events) {
  }

  login(): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:login');
  }


  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove(this.USER_OBJECT);
    this.events.publish('user:logout');
  };

  setUserForLogin(username: string, password: string): Promise<User> {
    this.user.setUsername(username);
    this.user.setPassword(password);
    return this.storage.set(this.USER_OBJECT, this.user);
  }

  getUserForLogin(): Observable<User> {
    return Observable.fromPromise(this.storage.get(this.USER_OBJECT));
  }

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN)
      .then((value) => {
        return value === true;
      });
  };




}

export class User {
  public username;
  public password;

  setUsername(username:string){
    this.username = username;
  }
  setPassword(password:string){
    this.password = password;
  }

  getUsername(){
    return this.username;
  }

  getPassword(){
    return this.password;
  }

}
