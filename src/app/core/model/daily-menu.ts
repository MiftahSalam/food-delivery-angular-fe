import { Meal } from "./meal";
import { WeeklyMenu } from "./weekly-menu";

export interface DailyMenu {
    idailyMenuID: number;
    date: Date;
    meals: Meal[];
    weeklyMenu: WeeklyMenu;
}
