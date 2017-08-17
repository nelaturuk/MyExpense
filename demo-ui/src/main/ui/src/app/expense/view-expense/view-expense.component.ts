import { Router } from '@angular/router';
import { Expense } from './../../services/expense/expense.model';
import { AccountService } from './../../services/account/account.service';
import { ExpenseService } from './../../services/expense/expense.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-view-expense',
  templateUrl: './view-expense.component.html',
  styleUrls: ['./view-expense.component.css', '../../../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewExpenseComponent implements OnInit {

  currentUserExp: Expense[] = [];
  showNoExpenses: boolean = false;
  options;
  data;
  viewByDate: boolean = false;
  viewByType: boolean = true;
  fromDate: Date = moment().subtract(30, 'd').toDate();
  toDate: Date = new Date();
  showFromDatePicker: boolean = false;
  showToDatePicker: boolean = false;

  constructor(private expenseService: ExpenseService,
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit() {
    if (this.accountService.getCurrentUser()) {
      this.expenseService.getExpensesByUserId(this.accountService.getCurrentUser().id)
        .then((res) => {
          if (res) {
            this.currentUserExp = res;
            if (this.currentUserExp.length > 0) {
              this.setD3Data();
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


  getExpensesByDate(): Expense[] {
    if(this.currentUserExp.length > 0) {
      return this.currentUserExp.filter(exp => exp.expenseDate <= this.toDate && exp.expenseDate >= this.fromDate);
    }
    return [];
  }

  setD3Data(): void {
    this.options = {
      chart: {
        type: 'pieChart',
        height: 450,
        x: function (d) { return d.key; },
        y: function (d) { return d.value; },
        showLabels: true,
        duration: 500,
        legend: {
          margin: {
            top: 5,
            right: 0,
            bottom: 5,
            left: 0
          }
        }
      }
    }

    this.data = [];

    this.getExpensesByDate().forEach(exp => {
      this.data.push({
        key: exp.type,
        value: exp.amount
      });
    });
  }

  getTotalAmount(): number {
    let result: number = 0;

    this.getExpensesByDate().forEach(exp => {
      result = result + exp.amount;
    });

    return result;
  }

  addExpense(): void {
    this.router.navigate(['/expense/add']);
  }

  updateFromDate(event): void {
    this.showFromDatePicker=false; 
    this.fromDate = event;
    this.setD3Data();
  }

  updateToDate(event): void {
    this.showToDatePicker=false; 
    this.toDate = event;
    this.setD3Data();
  }
}

