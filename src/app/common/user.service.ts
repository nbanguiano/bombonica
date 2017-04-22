import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { User } from './user';
import { WindowRefService } from './window-ref.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  
  private endPoints = {
    signup: '/signup',
    signin: '/signin'
  }

  constructor(private http: Http,
              private window: WindowRefService,
              private router: Router) {}
  
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  };

  // Basic getter & setter
  private saveToken(token) {
    window.localStorage['bombonica-token'] = token;
  };
  
  private currentUser() {
    if(this.isLoggedIn()){
      var token = this.getToken();
      var payload = token.split('.')[1];
      payload = window.atob(payload);
      payload = JSON.parse(payload);
      return {
        name : payload.name
      };
    }
  };

  getToken() {
    return window.localStorage['bombonica-token'];
  };

  isLoggedIn() {
    var token = this.getToken();
    var payload;
    if(token){
      payload = token.split('.')[1];
      payload = window.atob(payload);
      payload = JSON.parse(payload);
      // Check if the topen hasn't expired
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    };
  };

  signin(existingUser: User): Promise<void> {
    return this.http.post(this.endPoints.signin, existingUser)
               .toPromise()
               .then(response => {
                 this.saveToken(response.json().token);
                 this.router.navigate(['/admin/dashboard']);
                })
               .catch(this.handleError);
  }

  signup(newUser: User): Promise<void> {
    return this.http.post(this.endPoints.signup, newUser)
               .toPromise()
               .then(response => this.saveToken(response.json().token))
               .catch(this.handleError);
  }

  signout() {
    window.localStorage.removeItem('bombonica-token');
  }

  signUri(uri) {
    return uri + '?token=' + this.getToken();
  }

}
