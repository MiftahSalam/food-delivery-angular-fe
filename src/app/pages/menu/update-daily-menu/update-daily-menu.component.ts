import { SelectionModel } from '@angular/cdk/collections';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { isEmptyObject } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DailyMenu } from 'src/app/core/model/daily-menu';
import { Meal } from 'src/app/core/model/meal';
import { WeeklyMenuWithIds } from 'src/app/core/model/weekly-menu-with-ids';
import { DailyMenuService } from 'src/app/core/service/daily-menu.service';
import { MealService } from 'src/app/core/service/meal.service';
import { WeeklyMenuService } from 'src/app/core/service/weekly-menu.service';

@Component({
  selector: 'app-update-daily-menu',
  templateUrl: './update-daily-menu.component.html',
  styleUrls: ['./update-daily-menu.component.css']
})
export class UpdateDailyMenuComponent implements OnInit {
  @Input() dailyMenu: DailyMenu = {} as DailyMenu
  form = {} as FormGroup
  errorMessage = ""
  success = ""
  meals = [] as Meal[]
  element = {} as HTMLSelectElement
  displayedColumns = ['select', 'types', 'name', 'description']
  mealDataSource = new MatTableDataSource<Meal>
  selection = new SelectionModel<Meal>(true, [])
  closeButton = {} as HTMLButtonElement
  filterInput = {} as HTMLInputElement
  dialog = {} as HTMLDivElement
  weeklyMenu = {} as WeeklyMenuWithIds
  screenHeight = 0

  private successAddedMeal = new Subscription()
  private changeDailyMenu = new Subscription()

  constructor(
    public dailyMenuService: DailyMenuService,
    public mealService: MealService,
    private weeklyMenuService: WeeklyMenuService,
    private toastrService: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.changeDailyMenu = this.weeklyMenuService.successEmitter.subscribe(data => {
      this.getMeals()
    })
    this.successAddedMeal = this.mealService.successAddEmitter.subscribe(data => {
      this.success = "Successfully added new meal"
      this.getMeals()
      this.toastrService.success(this.success, "Add meal")
      this.filterInput = document.getElementById("filterInput") as HTMLInputElement
      this.filterInput.value = ""
    })

    this.getScreenSize()
  }

  close() {
    this.getMeals()
    this.filterInput = document.getElementById("filterInput") as HTMLInputElement
    this.filterInput.value = ""
  }

  onSubmit() {
    if (this.selection.selected.length == 0) {
      this.errorMessage = "You have to select at least one meal for daily menu"
      this.toastrService.error(this.errorMessage, "Update Daily Menu")
      return
    }

    if (!this.dailyMenu || this.dailyMenu.dailyMenuID == 0) {
      this.errorMessage = "This daily menu doesn't exist"
      this.toastrService.error(this.errorMessage, "Update Daily Menu")
      this.closeButton = document.getElementById("closeButton") as HTMLButtonElement
      this.closeButton.click()

      return
    }

    this.dailyMenu.meals = this.selection.selected
    this.dailyMenuService.updateDailyMenu(this.dailyMenu).subscribe({
      next: (data) => {
        this.success = "Successfully update a daily menu"
        this.dailyMenuService.successEmitter.next(this.dailyMenu)
        this.toastrService.success(this.success, "Update Daily Menu")
        this.closeButton = document.getElementById("closeButton") as HTMLButtonElement
        this.closeButton.click()
      },
      error: (err) => {
        this.errorMessage = "You cannot change daily menu for today and before today"
        this.toastrService.error(this.errorMessage, "Update Daily Menu")
      }
    })

  }

  applyFilter(target: any) {
    this.mealDataSource.filter = target.value.trim().toLowerCase()
  }
  checkBoxLabel(row?: Meal) {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.mealDataSource.data.forEach(data => {
      this.selection.select(data)
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length
    const numRows = this.mealDataSource.data.length

    return numRows === numSelected
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenHeight = window.innerHeight
    this.screenHeight = this.screenHeight - 150
  }

  getMeals() {
    this.mealService.getAllMeals().subscribe(data => {
      if (data != null && data.length > 0) {
        this.meals = data
        this.mealDataSource = new MatTableDataSource(this.meals)
        this.setFilterForTable()
        this.selection = new SelectionModel<Meal>(true, [])

        if (this.dailyMenu && !isEmptyObject(this.dailyMenu)) {
          this.getImage()
        }

        if (this.dailyMenu.meals && this.dailyMenu.meals.length > 0) {
          this.dailyMenu.meals.forEach(meal => {
            this.selectMeal(meal)
          })
        }
      } else {
        this.meals = []
        this.mealDataSource = new MatTableDataSource(this.meals)
      }
    })
  }

  selectMeal(meal: Meal) {
    this.mealDataSource.data.forEach(data => {
      if (data.id == meal.id) {
        this.selection.select(data)
        return
      }
    })
  }

  setFilterForTable() {
    this.mealDataSource.filterPredicate = function (data: Meal, filter: string): boolean {
      if (data.types.length != 1) {
        return "reguler".includes(filter)
      } else {
        return data.types[0].name.toLowerCase().includes(filter)
      }
    }
  }

  getImage() {
    this.weeklyMenu = JSON.parse(localStorage.getItem("currentWeeklyMenu") || "{}")
  }
}
