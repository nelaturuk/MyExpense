import { Injectable } from '@angular/core';

var expenseTypes = [
    "household", "internet","phone", "groceries", "transport", "outside-food", "other"
];

@Injectable()
export class AppProperties {
    public static get ExpenseTypes(): string[] {
        return expenseTypes;
    }
}
