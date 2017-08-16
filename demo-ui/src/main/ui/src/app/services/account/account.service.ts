import { Http, Headers, RequestOptions } from '@angular/http';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { deserialize } from "serializer.ts/Serializer";

@Injectable()
export class AccountService {

  private userUrl = '/api/users';
  private currentUser: User;

  constructor(private http: Http) { }

  getCurrentUser(): User {
    return this.currentUser;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  register(user: User): Promise<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.userUrl, user, options)
      .toPromise()
      .then(res => {
        console.log(res.statusText);
        if (res.statusText === 'Created') {
          return Promise.resolve(true);
        }
        return Promise.resolve(false);
      });
  }

  login(email: string, password: string): Promise<boolean> {
    //Need to hash password instead of literal
    let user: User = new User();
    user.email = email;
    user.password = password;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.userUrl + '/login', user, options)
      .toPromise()
      .then(res => {
        console.log(res);
        if (res) {
          localStorage.setItem('loggedIn', email);
          let loggedInUser:User = deserialize<User>(User, res.json());
          this.currentUser = loggedInUser;
          return Promise.resolve(true);
        }
        return Promise.resolve(false);
      })
      .catch((res) => {
        return Promise.resolve(false);
      });
  }

  logout(): Promise<boolean> {
    //Remove from session 
    if(localStorage.getItem('loggedIn')){
      localStorage.removeItem('loggedIn');
    }
    return Promise.resolve(true);
  }

}
