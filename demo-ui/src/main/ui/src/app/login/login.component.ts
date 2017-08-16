import { Router } from '@angular/router';
import { AccountService } from './../services/account/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  loginFailure: boolean = false;

  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    this.accountService.login(this.email, this.password)
        .then((res) => {
          if(res) {
            this.loginFailure = false;
            this.router.navigate(['/expense']);
          } else {
            this.loginFailure = true;
          }
        });
  }

}
