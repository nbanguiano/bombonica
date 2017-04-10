import { Injectable } from '@angular/core';
import { User } from './user';
import { Http, Response } from '@angular/http';
import { WindowRefService } from './window-ref.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  
  private endPoints = {
    signup: '/api/signup',
    signin: '/api/signin'
  }

  constructor(private http: Http,
              private window: WindowRefService) {}
  
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  };

  // Basic getter & setter
  private saveToken(token) {
    window.localStorage['bombonica-token'] = token;
  };
  private getToken() {
    return window.localStorage['bombonica-token'];
  };

  private isLoggedIn() {
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


  signin(existingUser: User): Promise<void> {
    return this.http.post(this.endPoints.signin, existingUser)
               .toPromise()
               .then(response => this.saveToken(response.json().token))
               .catch(this.handleError);
  }

  signup(newUser: User): Promise<void> {
    return this.http.post(this.endPoints.signup, newUser)
               .toPromise()
               .then(response => this.saveToken(response.json().token))
               .catch(this.handleError);
  }

  logout() {
    window.localStorage.removeItem('bombonica-token');
  }

}
