import { Component, OnInit } from '@angular/core';
import { User } from './core/model/user';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './core/service/auth.service';
import { ChosenOneService } from './core/service/chosen-one.service';
import { OrderService } from './core/service/order.service';
import { UserDTO } from './core/model/dto/user-dto';
import { Order } from './core/model/order';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User | null = null
  chosenOne: UserDTO | null = null
  currentUserOrders: Order[] = []
  orderSum: number = 0
  haveUnpaidOrder = false

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private chosenOneService: ChosenOneService,
    private orderService: OrderService
  ) {
    authService.currentUser.subscribe(user => this.currentUser = user)
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.authService.isLoggedIn()) {
        this.chosenOneService.getChosenOne().subscribe(chosen => {
          this.chosenOne = chosen as UserDTO
        })

        this.orderService.getOrders("today").subscribe(orders => {
          this.currentUserOrders = orders
          if (orders) {
            this.orderSum = 0;
            orders.forEach(order => {
              this.orderSum += order.type.price
              if (!order.paid) {
                this.haveUnpaidOrder = true
              }
            })
          }
        })
      }
    })
  }

  isLoggedIn() {
    return this.authService.isLoggedIn()
  }

  isChosenRole() {
    this.authService.currentUserValue?.role === 'CHOOSEN'
  }

  logout() {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
