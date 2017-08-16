import { ExpenseService } from './services/expense/expense.service';
import { AccountService } from './services/account/account.service';
import { AuthGuard } from './auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AddExpenseComponent } from './expense/add-expense/add-expense.component';
import { ViewExpenseComponent } from './expense/view-expense/view-expense.component';
import { ExpenseComponent } from './expense/expense.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';

const appRoutes: Routes = [
  {
    path: 'expense',
    component: ExpenseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ViewExpenseComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'add',
        component: AddExpenseComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AddExpenseComponent,
    ViewExpenseComponent,
    ExpenseComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    DatepickerModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AccountService,
    ExpenseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
