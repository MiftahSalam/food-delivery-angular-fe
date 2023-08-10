import { Meal } from "./meal";
import { Type } from "./type";
import { User } from "./user";

export interface Order {
    userOrderId: number;
    meal: Meal
    type: Type
    user: User
    paid: boolean;
}
