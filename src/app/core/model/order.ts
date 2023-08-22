import { Meal } from "./meal";
import { Type } from "./type";
import { User } from "./user";

export interface Order {
    id: number;
    meal: Meal
    type: Type
    user: User
    paid: boolean;
}
