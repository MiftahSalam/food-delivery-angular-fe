import { Type } from "./type";

export interface Meal {
    id: number;
    name: string;
    description: string;
    earlyOrder: boolean;
    isReguler: boolean;
    types: Type[];
}
