import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { UpdateWeeklyMenuComponent } from './update-weekly-menu/update-weekly-menu.component';



@NgModule({
  declarations: [
    AddMenuComponent,
    UpdateWeeklyMenuComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
