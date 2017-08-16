import { AccountService } from './services/account/account.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(this.accountService.getCurrentUser()){
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      } 
  }
}