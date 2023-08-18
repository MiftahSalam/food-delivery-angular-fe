import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guard/auth.guard';
import { WeeklyMenuComponent } from './weekly-menu/weekly-menu.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { adminGuard } from 'src/app/core/guard/admin.guard';
import { UpdateWeeklyMenuComponent } from './update-weekly-menu/update-weekly-menu.component';

const routes: Routes = [
  { path: 'weeklyMenu', component: WeeklyMenuComponent, canActivate: [authGuard] },
  { path: 'addMenu', component: AddMenuComponent, canActivate: [adminGuard] },
  { path: 'updateWeeklyMenu', component: UpdateWeeklyMenuComponent, canActivate: [adminGuard] },
  { path: 'updateWeeklyMenu/:id', component: UpdateWeeklyMenuComponent, canActivate: [adminGuard] },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
