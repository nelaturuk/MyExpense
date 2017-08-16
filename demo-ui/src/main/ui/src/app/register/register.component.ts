import { Router } from '@angular/router';
import { AccountService } from './../services/account/account.service';
import { User } from './../services/account/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: User = new User();

  constructor(private accountService: AccountService,
              private route: Router) { }

  ngOnInit() {
  }

  register() {
    this.accountService.register(this.newUser).then(res => {
      if(res){
        this.route.navigate(['/login']);
      }
    });
  }

}
