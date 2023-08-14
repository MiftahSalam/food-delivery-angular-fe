import { Component, OnInit } from '@angular/core';
import { WeeklyMenu } from 'src/app/core/model/weekly-menu';
import { WeeklyMenuService } from 'src/app/core/service/weekly-menu.service';

@Component({
  selector: 'app-weekly-menu',
  templateUrl: './weekly-menu.component.html',
  styleUrls: ['./weekly-menu.component.css']
})
export class WeeklyMenuComponent implements OnInit {
  weeklyMenu: WeeklyMenu | null = null

  constructor(private weeklyMenuService: WeeklyMenuService) {

  }
  ngOnInit(): void {
    this.weeklyMenuService.getWeeklyMenu().subscribe(data => {
      this.weeklyMenu = data
    })
  }


}
