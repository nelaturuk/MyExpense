import { deserialize } from 'serializer.ts/Serializer';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Expense } from './expense.model';
import { AccountService } from './../account/account.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ExpenseService {

  private expenseUrl = "/api/expenses";

  constructor(private accountService: AccountService, private http: Http) { }

  getExpensesByUserId(userId: string): Promise<Expense[]>{
    return this.http.get(this.expenseUrl + '/user/' + userId)
               .toPromise()
               .then((resp) => {
                let expenses: Expense[] = deserialize<Expense[]>(Expense, resp.json());
                return Promise.resolve(expenses);
               })
               .catch((res) => {
                return Promise.reject(undefined);
               });  
  }

  addExpense(expense: Expense): Promise<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.expenseUrl, expense, options)
               .toPromise()
               .then((res) => {
                 if(res.statusText == 'Created'){
                   return Promise.resolve(true);
                 } else {
                   return Promise.resolve(false);
                 }
               });
  }
}
