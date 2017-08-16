import { AccountService } from './../services/account/account.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  showLogout: boolean = false;

  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    if(this.accountService.getCurrentUser()){
      this.showLogout = true;
    }
  }

  logout(): void {
     this.accountService.setCurrentUser(undefined);
     localStorage.clear(); 
     this.router.navigate(['/login']);
  }
}
