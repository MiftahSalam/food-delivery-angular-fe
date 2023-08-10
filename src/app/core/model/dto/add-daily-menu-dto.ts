import { Meal } from "../meal";
import { WeeklyMenuWithIds } from "../weekly-menu-with-ids";

export interface AddDailyMenuDTO {
    date: Date;
    meals: Meal[];
    weeklyMenu: WeeklyMenuWithIds
}
