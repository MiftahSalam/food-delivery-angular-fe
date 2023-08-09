import { Meal } from "./meal";
import { WeeklyMenu } from "./weekly-menu";

export interface DailyMenu {
    id: number;
    date: Date;
    meals: Meal[];
    weeklyMenu: WeeklyMenu;
}
