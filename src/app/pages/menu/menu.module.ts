import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { UpdateWeeklyMenuComponent } from './update-weekly-menu/update-weekly-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { UpdateDailyMenuComponent } from './update-daily-menu/update-daily-menu.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MealModule } from '../meal/meal.module';



@NgModule({
  declarations: [
    AddMenuComponent,
    UpdateWeeklyMenuComponent,
    UpdateDailyMenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatDatepickerModule,
    MenuRoutingModule,
    MealModule,
  ]
})
export class MenuModule { }
