import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isEmptyObject } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DailyMenu } from 'src/app/core/model/daily-menu';
import { WeeklyMenuWithIds } from 'src/app/core/model/weekly-menu-with-ids';
import { DailyMenuService } from 'src/app/core/service/daily-menu.service';
import { MealService } from 'src/app/core/service/meal.service';
import { WeeklyMenuService } from 'src/app/core/service/weekly-menu.service';

@Component({
  selector: 'app-update-weekly-menu',
  templateUrl: './update-weekly-menu.component.html',
  styleUrls: ['./update-weekly-menu.component.css']
})
export class UpdateWeeklyMenuComponent implements OnInit {
  currentWeeklyMenu = {} as WeeklyMenuWithIds
  weeklyMenus = [] as WeeklyMenuWithIds[]
  dailyMenus: Array<DailyMenu> = []
  errorMessage = ""
  success = ""
  search: Date | null = null
  successSub = new Subscription
  currentDailyMenu = {} as DailyMenu
  weeklyMenuId = 0
  dailyMenuDataSource = new MatTableDataSource<DailyMenu>
  displayedColumns = ["date", "meals", "updateMenu"]
  expandedElement = {} as DailyMenu
  daily = {} as DailyMenu

  constructor(
    private weeklyMenuService: WeeklyMenuService,
    private dailyMenuService: DailyMenuService,
    private mealService: MealService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessage: MatSnackBar,
    private toasterService: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.getWeeklyMenus()
    this.successSub = this.dailyMenuService.successEmitter.subscribe(data => {
      this.getDailyMenus()
    })
    this.route.params.subscribe((params: Params) => {
      this.weeklyMenuId = params['id']
    })
  }

  getWeeklyMenus() {
    this.weeklyMenuService.getAllWeeklyMenu().subscribe(menus => {
      if (menus != null && menus.length != 0) {
        this.weeklyMenus = menus
        if (this.weeklyMenuId > 0) {
          this.currentWeeklyMenu = this.weeklyMenus[0]
          this.getDailyMenus()
        } else {
          this.setCurrentWeeklyMenu()
        }
      } else {
        this.weeklyMenus = []
      }
    })
  }

  setCurrentWeeklyMenu() {
    this.weeklyMenus.forEach(menu => {
      if (menu.id == this.weeklyMenuId) {
        this.currentWeeklyMenu = menu
        return
      }
    })

    if (!this.currentWeeklyMenu || isEmptyObject(this.currentWeeklyMenu)) {
      this.currentWeeklyMenu = this.weeklyMenus[0]
    }

    this.getDailyMenus()
  }

  getDailyMenus() {
    this.dailyMenuService.getDailyMenus(this.currentWeeklyMenu).subscribe(menus => {
      if (menus != null && menus.length > 0) {
        this.dailyMenus = menus
        this.errorMessage = ""
      } else {
        this.dailyMenus = []
      }

      this.dailyMenuDataSource = new MatTableDataSource(this.dailyMenus)
    })
  }

  onChange(menu: any) {
    console.log(menu);
    this.currentWeeklyMenu = menu
    this.getDailyMenus()
  }

  updateDailyMenu(dailyMenu: DailyMenu) {
    if (dailyMenu) {
      this.currentDailyMenu = dailyMenu
      localStorage.setItem('currentWeeklyMenu', JSON.stringify(this.currentWeeklyMenu))
      this.weeklyMenuService.successEmitter.next(this.currentDailyMenu)
    }
  }
}
