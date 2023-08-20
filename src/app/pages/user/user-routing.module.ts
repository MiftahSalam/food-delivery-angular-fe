import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { adminGuard } from 'src/app/core/guard/admin.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { authGuard } from 'src/app/core/guard/auth.guard';

const routes: Routes = [
  { path: '', component: UsersComponent, canActivate: [adminGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [authGuard] },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
