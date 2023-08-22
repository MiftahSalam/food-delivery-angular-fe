import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCancelComponent } from './order-cancel/order-cancel.component';
import { OrderRoutingModule } from './order-routing.module';
import { AllOrderComponent } from './all-order/all-order.component';
import { TodayOrderComponent } from './today-order/today-order.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    OrderCancelComponent,
    AllOrderComponent,
    TodayOrderComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    OrderRoutingModule,
    SharedModule,
  ],
})
export class OrderModule { }
