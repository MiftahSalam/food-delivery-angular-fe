import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guard/auth.guard';
import { OrderCancelComponent } from './order-cancel/order-cancel.component';
import { AllOrderComponent } from './all-order/all-order.component';
import { TodayOrderComponent } from './today-order/today-order.component';

const routes: Routes = [
  { path: 'orderCanceling', component: OrderCancelComponent, canActivate: [authGuard] },
  { path: 'AllOrders', component: AllOrderComponent, canActivate: [authGuard] },
  { path: 'todayOrders', component: TodayOrderComponent, canActivate: [authGuard] },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
