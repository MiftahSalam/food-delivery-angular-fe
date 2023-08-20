import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DailyMenu } from 'src/app/core/model/daily-menu';
import { MealDTO } from 'src/app/core/model/dto/meal-dto';
import { Meal } from 'src/app/core/model/meal';
import { Type } from 'src/app/core/model/type';
import { AuthService } from 'src/app/core/service/auth.service';
import { DailyMenuService } from 'src/app/core/service/daily-menu.service';
import { OrderService } from 'src/app/core/service/order.service';
import { TypeService } from 'src/app/core/service/type.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dailyMenu: DailyMenu | null = null
  types: Type[] = []
  showRegular: boolean = false
  mealDtos: MealDTO[] = []
  meals: Meal[] = []
  message: string = ""
  token: string = ""
  quantity: HTMLCollectionOf<HTMLInputElement> = {} as HTMLCollectionOf<HTMLInputElement>;
  isEnabled: boolean = false;

  constructor(
    private dailyMenuService: DailyMenuService,
    private typeService: TypeService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private authService: AuthService,
  ) {

  }
  onChanges(event: Event): void {
    let count = 0
    this.isEnabled = false
    for (let index = 0; index < this.quantity.length; index++) {
      const item = this.quantity.item(index)
      if (item) {
        if (+item.value > 0) {
          this.isEnabled = true
          return;
        } else count++
      }
    }
  }

  ngOnInit(): void {
    this.getDailyMenu()
    this.quantity = document.getElementsByClassName("quantity") as HTMLCollectionOf<HTMLInputElement>
    this.route.queryParams.subscribe(param => {
      this.token = param["token"]
      if (this.token) {
        this.authService.sendToken(this.token)
      }
    })
  }

  getDailyMenu() {
    this.dailyMenuService.getDailyMenu().subscribe(menu => {
      this.dailyMenu = menu
      if (this.dailyMenu) {
        this.typeService.getAllType().subscribe(types => {
          if (types != null && types.length != 0) {
            this.types = [...new Map(types.map(type => [type.name, type])).values()]
            this.isRegularExist(this.types)
          }
        })
      }
    })
  }

  isRegularExist(types: Type[]) {
    types.forEach(type => {
      if (type.reguler) {
        this.showRegular = true
        return;
      }
    })
  }

  onConfirmed(confirmed: boolean) {
    if (confirmed) {
      this.orderService.addOrder(this.mealDtos).subscribe({
        next: data => {
          this.toastrService.success("Food is ordered successfully", "Ordering food")
          this.resetOrder()
        }, error: (msg: HttpErrorResponse) => {
          if (msg.status == HttpStatusCode.NotAcceptable) {
            this.toastrService.error("You must sign in to be able to order", "Ordering food")
          } else if (msg.status == HttpStatusCode.BadRequest) {
            this.toastrService.error("Ordering failed. Please check your input", "Ordering food")
          } else {
            this.toastrService.error("You can order food fo today until 10 o'clock. You can order food for tomorrow until 17 o'clock.", 'Ordering food')
          }
        }
      })
    }
  }

  arrangeMeals(meals: Meal[]) {
    let arrangedMeals: Meal[] = []
    this.types.forEach(type => {
      meals.forEach(meal => {
        if (!meal.types[0].reguler && meal.types[0].name === type.name) {
          arrangedMeals.push(meal)
        }
      })
    })

    meals.forEach(meal => {
      if (meal.types[0].reguler) {
        arrangedMeals.push(meal)
      }
    })

    return arrangedMeals
  }

  order() {
    this.mealDtos = []
    this.meals = this.arrangeMeals(this.dailyMenu ? this.dailyMenu.meals : [])
    let mealIdx = 0

    for (let i = 0; i < this.quantity.length; i++) {
      const quantityItem = this.quantity.item(i)

      if (!this.meals[mealIdx].types[0].reguler) {
        if (quantityItem && +quantityItem.value > 0) {
          this.mealDtos.push({
            meal: this.meals[mealIdx],
            regular: this.meals[mealIdx].types[i].name,
            count: +quantityItem.value
          })
        }
      }

      if (this.meals[mealIdx].types[0].reguler) {
        for (let j = 0; j < this.meals[mealIdx].types.length; j++) {
          if (quantityItem && +quantityItem.value > 0) {
            this.mealDtos.push({
              meal: this.meals[mealIdx],
              regular: this.meals[mealIdx].types[j].name,
              count: +quantityItem.value
            })
          }
        }
      }

      mealIdx++
    }
  }

  menu() {
    this.router.navigate(["/menu/addMenu"])
  }

  weeklyMenu() {
    this.router.navigate(["weeklyMenu"])
  }

  isAdmin() {
    return this.authService.isAdmin()
  }

  resetOrder() {
    for (let index = 0; index < this.quantity.length; index++) {
      if (this.quantity.item(index)) {
        this.quantity.item(index)!.value = '0'
      }
    }

    this.isEnabled = false
  }

  private removeUnusedTypes(types: Type[]) {
    let newTypes: Type[] = []
    types.forEach(oldType => {
      this.dailyMenu?.meals.forEach(meal => {
        meal.types.forEach(type => {
          if (oldType.name == type.name) {
            newTypes.push(oldType)
          }
        })
      })
    })

    return newTypes
  }
}
