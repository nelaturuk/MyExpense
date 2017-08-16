import { Router } from '@angular/router';
import { Expense } from './../../services/expense/expense.model';
import { AccountService } from './../../services/account/account.service';
import { ExpenseService } from './../../services/expense/expense.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-expense',
  templateUrl: './view-expense.component.html',
  styleUrls: ['./view-expense.component.css']
})
export class ViewExpenseComponent implements OnInit {

  currentUserExp: Expense[] = [];
  showNoExpenses: boolean = false;

  constructor(private expenseService: ExpenseService,
              private accountService: AccountService,
              private router: Router) { }

  ngOnInit() {
    if(this.accountService.getCurrentUser()){
      this.expenseService.getExpensesByUserId(this.accountService.getCurrentUser().id)
          .then((res) => {
            if(res){
              this.currentUserExp = res;
              if(this.currentUserExp.length > 0){
                this.showNoExpenses = false;
              } else {
                this.showNoExpenses = true;
              }
            }
          }, (rej) => {
            this.showNoExpenses = true;
          });
    }
  }

}
