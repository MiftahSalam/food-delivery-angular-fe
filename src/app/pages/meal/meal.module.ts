import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesComponent } from './types/types.component';
import { MealComponent } from './meal/meal.component';
import { MealRoutingModule } from './meal-routing.module';



@NgModule({
  declarations: [
    TypesComponent,
    MealComponent
  ],
  imports: [
    CommonModule,
    MealRoutingModule
  ]
})
export class MealModule { }
