import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/core/model/order';
import { AuthService } from 'src/app/core/service/auth.service';
import { ChosenOneService } from 'src/app/core/service/chosen-one.service';
import { OrderService } from 'src/app/core/service/order.service';

@Component({
  selector: 'app-all-order',
  templateUrl: './all-order.component.html',
  styleUrls: ['./all-order.component.css']
})
export class AllOrderComponent implements OnInit, AfterViewInit {
  orders = [] as Order[]
  showDialog = false
  forDay = ""
  errorMessage = ""
  success = ""
  orderEmpty = false
  dataSource = {} as MatTableDataSource<Order>
  displayedColumns = ["id", "user.name", "user.email", "meal.name", "meal.description", "type.name", "type.price", "paid"]
  @ViewChild('combobox', { static: false }) combobox = {} as ElementRef

  constructor(
    private router: Router,
    private chosenOneService: ChosenOneService,
    private orderService: OrderService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn() || !this.authService.isAdmin) {
      this.router.navigate(["/"])
    }
  }

  ngAfterViewInit(): void {
    this.forDay = this.combobox.nativeElement.value
    this.chosenOneService.getTodayOrders(this.forDay).subscribe(data => {
      if (data && data.length > 0) {
        this.orders = data
        this.dataSource = new MatTableDataSource(data)
        this.orderEmpty = false
      } else {
        this.orderEmpty = true
      }
    })
  }

  onComboboxChange(target: any) {
    if (target.value) {
      this.forDay = target.value
      this.chosenOneService.getTodayOrders(this.forDay).subscribe(data => {
        if (data && data.length > 0) {
          this.orders = data
          this.dataSource = new MatTableDataSource(data)
          this.orderEmpty = false
        } else {
          this.orderEmpty = true
          this.orders = []
          this.dataSource = new MatTableDataSource(this.orders)
        }
      })
    }
  }

  onBtnClick(orderId: number) {
    this.showDialog = true
  }

  onConfirm(target: any, orderId: number) {
    if (target.value && target.value == true) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: (data) => {
          this.success = "Successfully delete order"
          this.onComboboxChange(this.forDay)
          this.toastr.success(this.success, "Cancel order")
        },
        error: (err) => {
          this.errorMessage = "Error occurred while deleting a order.You can delete your order for today until 10 o'clock and " +
            "you can delete your order for tomorrow until 17 o'clock."
          this.toastr.error(this.errorMessage, "Cancel order")
        }
      })
    }
  }
}
