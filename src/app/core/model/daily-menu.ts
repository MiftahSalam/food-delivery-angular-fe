import { Meal } from "./meal";
import { WeeklyMenu } from "./weekly-menu";

export interface DailyMenu {
    dailyMenuID: number;
    date: Date;
    meals: Meal[];
    weeklyMenu: WeeklyMenu;
}
