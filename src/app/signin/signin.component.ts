import { Component, OnInit } from '@angular/core';
import { User } from '../common/user';
import { UserService } from '../common/user.service';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [UserService]
})

export class SigninComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.logout();

    var user: User = {
      name: '',
      password: ''
    };
    this.user = user;
  }

  signinUser(user: User) {
    this.userService.signin(user)
        .then()
        .catch(error => console.error(error.message));
  }

  signupUser(user: User) {
    this.userService.signup(user)
        .then()
        .catch(error => console.error(error.message));
  }

}
