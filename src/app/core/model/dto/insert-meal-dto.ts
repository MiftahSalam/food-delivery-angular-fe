import { Type } from "../type";

export interface InsertMealDTO {
    name: string;
    description: string;
    earlyOrder: boolean;
    isReguler: boolean;
    types: Type[];
}
