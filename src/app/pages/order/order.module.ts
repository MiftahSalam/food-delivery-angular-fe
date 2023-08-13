import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCancelComponent } from './order-cancel/order-cancel.component';
import { OrderRoutingModule } from './order-routing.module';
import { AllOrderComponent } from './all-order/all-order.component';
import { TodayOrderComponent } from './today-order/today-order.component';



@NgModule({
  declarations: [
    OrderCancelComponent,
    AllOrderComponent,
    TodayOrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
