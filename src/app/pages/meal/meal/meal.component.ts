import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Meal } from 'src/app/core/model/meal';
import { MealService } from 'src/app/core/service/meal.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
  meals = [] as Meal[]
  isEmpty = false
  currentMeal = {} as Meal
  show = false
  displayColumns = ['name', 'description', 'update']
  mealsDataSource = new MatTableDataSource<Meal>
  filterInput = {} as HTMLInputElement
  @ViewChild(MatSort, { static: true }) sort = {} as MatSort
  public searchString = ""
  private successSub = new Subscription()
  private successAddedMeal = new Subscription()

  constructor(
    private mealService: MealService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/search.svg'))
  }

  ngOnInit(): void {
    this.successSub = this.mealService.successUpdateEmitter.subscribe(data => {
      this.toastr.success("Successfully update meal", "Update meal")
      this.getMeals()
    })

    this.getMeals()

    this.successAddedMeal = this.mealService.successAddEmitter.subscribe(data => {
      this.toastr.success("Successfully add new meal", "Add meal")
      this.getMeals()
    })
  }

  applyFilter(target: any) {
    this.mealsDataSource.filter = target.value.trim().toLowerCase()
  }

  update(meal: Meal) {
    if (meal) {
      this.show = true
      this.currentMeal = meal
    }
  }

  giveFocus() {
    document.getElementById("filter")?.focus()
  }

  getMeals() {
    this.filterInput = document.getElementById("filterInput") as HTMLInputElement
    this.filterInput.value = ""
    this.mealService.getAllMeals().subscribe(data => {
      if (data && data.length > 0) {
        this.meals = data
        this.mealsDataSource = new MatTableDataSource(this.meals)
        this.mealsDataSource.sort = this.sort
        this.isEmpty = false
      } else {
        this.isEmpty = true
      }
    })
  }
}
