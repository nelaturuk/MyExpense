import { Router } from '@angular/router';
import { Expense } from './../../services/expense/expense.model';
import { AccountService } from './../../services/account/account.service';
import { ExpenseService } from './../../services/expense/expense.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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
              this.showNoExpenses = false;
            } else {
              this.showNoExpenses = true;
            }
          }
        }, (rej) => {
          this.showNoExpenses = true;
        });
    }

    this.setD3Data();
  }

  setD3Data(): void {
    if (this.viewByType) {
      this.options = {
        chart: {
          type: 'pieChart',
          height: 450,
          donut: true,
          x: function (d) { return d.key; },
          y: function (d) { return d.value; },
          showLabels: true,
          pie: {
            startAngle: function (d) { return d.startAngle - Math.PI },
            endAngle: function (d) { return d.endAngle - Math.PI }
          },
          duration: 500,
          legend: {
            margin: {
              top: 5,
              right: 140,
              bottom: 5,
              left: 0
            }
          }
        }
      }

      this.data = [];

      this.currentUserExp.forEach(exp => {
        this.data.push({
          key: exp.type,
          value: exp.amount
        });
      })
    }

    if (this.viewByDate) {
      this.options = {
        chart: {
          type: 'multiBarChart',
          height: 450,
          margin: {
            top: 20,
            right: 20,
            bottom: 45,
            left: 45
          },
          clipEdge: true,
          //staggerLabels: true,
          duration: 500,
          stacked: true,
          xAxis: {
            axisLabel: 'Expense Type ($)',
            showMaxMin: false,
            tickFormat: function (d) {
              return d.key;
            }
          },
          yAxis: {
            axisLabel: 'Expense Date',
            axisLabelDistance: -20,
            tickFormat: function (d) {
              return d3.format(',.1f')(d);
            }
          }
        }
      }

      this.data = [];

      this.currentUserExp.forEach(exp => {
        this.data.push({
          key: exp.type,
          value: exp.amount
        });
      })
    }
  }
}

