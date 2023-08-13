import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guard/auth.guard';
import { OrderCancelComponent } from './order-cancel/order-cancel.component';

const routes: Routes = [
  { path: 'orderCanceling', component: OrderCancelComponent, canActivate: [authGuard] },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
