import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class CanActivateChildGuard implements CanActivateChild {

  constructor(private userService: UserService, private router: Router) {}

  canActivateChild() {
    if (this.userService.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/signin']);
      return false;
    }
  };
};
