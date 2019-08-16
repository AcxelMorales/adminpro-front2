import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public _userService: UserService,
    public router      : Router
  ) { }
  
  canActivate(): boolean {
    if (this._userService.isLoged()) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }

}
