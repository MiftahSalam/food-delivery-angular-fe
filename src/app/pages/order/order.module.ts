import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCancelComponent } from './order-cancel/order-cancel.component';
import { OrderRoutingModule } from './order-routing.module';



@NgModule({
  declarations: [
    OrderCancelComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
