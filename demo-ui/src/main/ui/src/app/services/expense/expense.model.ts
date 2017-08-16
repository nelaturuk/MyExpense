import { User } from './../account/user.model';
import { Type, Skip } from "serializer.ts/Decorators";

export class Expense {
    id: string;

    @Type(() => User)
    user: User;

    type: string;
    amount: number;
    expenseDate: Date;
    createdDate: Date;
    updatedDate: Date;
}