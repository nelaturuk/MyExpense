import { ExpenseService } from './../../services/expense/expense.service';
import { AccountService } from './../../services/account/account.service';
import { AppProperties } from './../../app.properties';
import { Expense } from './../../services/expense/expense.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  expenseTypes: string[] = AppProperties.ExpenseTypes;
  newExpense: Expense = new Expense();
  expenseAdded: boolean = false;
  expenseAddFail: boolean = false;
  showDatePicker: boolean = false;

  constructor(private accountService: AccountService,
    private expenseService: ExpenseService) { }

  ngOnInit() {
  }

  addExpense(): void {
    this.newExpense.user = this.accountService.getCurrentUser();
    this.expenseService.addExpense(this.newExpense)
      .then((res) => {
        if (res) {
          this.expenseAdded = true;
        } else {
          this.expenseAddFail = true;
        }
      });
  }

}
