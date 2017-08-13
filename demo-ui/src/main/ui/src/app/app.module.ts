import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AddExpenseComponent } from './expense/add-expense/add-expense.component';
import { ViewExpenseComponent } from './expense/view-expense/view-expense.component';
import { ExpenseComponent } from './expense/expense.component';

const appRoutes: Routes = [
  {
    path: 'expense',
    component: ExpenseComponent
  },
  { path: '',
    redirectTo: '/expense',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AddExpenseComponent,
    ViewExpenseComponent,
    ExpenseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
