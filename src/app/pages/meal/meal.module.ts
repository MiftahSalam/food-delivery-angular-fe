import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesComponent } from './types/types.component';
import { MealComponent } from './meal/meal.component';
import { MealRoutingModule } from './meal-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AddTypeComponent } from './component/add-type/add-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateTypeComponent } from './component/update-type/update-type.component';



@NgModule({
  declarations: [
    TypesComponent,
    MealComponent,
    AddTypeComponent,
    UpdateTypeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MealRoutingModule
  ]
})
export class MealModule { }
