import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { WeeklyMenu } from '../model/weekly-menu';
import { WeeklyMenuWithIds } from '../model/weekly-menu-with-ids';
import { DailyMenu } from '../model/daily-menu';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BaseResponse } from '../model/response/base-response';

@Injectable({
  providedIn: 'root'
})
export class WeeklyMenuService {
  dataChange: BehaviorSubject<WeeklyMenu | null> = new BehaviorSubject<WeeklyMenu | null>(null)
  dataChangeImage: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)
  dataChanges: BehaviorSubject<WeeklyMenuWithIds[] | null> = new BehaviorSubject<WeeklyMenuWithIds[] | null>(null)
  dataChangesAll: BehaviorSubject<WeeklyMenuWithIds[] | null> = new BehaviorSubject<WeeklyMenuWithIds[] | null>(null)
  successEmitter = new Subject<DailyMenu>()
  baseUrl = environment.baseUrl
  weeklyMenuUrl = this.baseUrl + '/weekly-menu'

  constructor(private httpClient: HttpClient) { }

  /**
   * getWeeklyMenu
   */
  public getWeeklyMenu(): Observable<WeeklyMenu | null> {
    this.httpClient.get(this.weeklyMenuUrl).subscribe({
      next: (resp) => {
        const baseResponse = resp as BaseResponse<WeeklyMenu>

        this.dataChange.next(baseResponse.data)
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.name + " " + err.message);
      }
    })

    return this.dataChange.asObservable();
  }

  /**
   * getAllWeeklyMenu
   */
  public getAllWeeklyMenu(): Observable<WeeklyMenuWithIds[] | null> {
    this.httpClient.get(this.weeklyMenuUrl + '/all').subscribe({
      next: (resp) => {
        const baseResponse = resp as BaseResponse<WeeklyMenuWithIds[]>

        this.dataChanges.next(baseResponse.data)
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.name + " " + err.message);
      }
    })

    return this.dataChanges.asObservable();
  }

  /**
   * addImage
   */
  public addImage(image: FormData): Observable<string | null> {
    this.httpClient.post(this.baseUrl + "/files/WEEKLY-MENU", image).subscribe({
      next: (resp) => {
        const baseResponse = resp as BaseResponse<string>

        this.dataChangeImage.next(baseResponse.data)
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.name + " " + err.message);
      }
    })

    return this.dataChangeImage.asObservable()
  }

  /**
   * addWeeklyMenu
   */
  public addWeeklyMenu(weeklyMenu: WeeklyMenu) {
    this.httpClient.post(this.weeklyMenuUrl, weeklyMenu).subscribe()
  }

  /**
   * updateWeeklyMenu
   */
  public updateWeeklyMenu(weeklyMenu: WeeklyMenu) {
    this.httpClient.put(this.weeklyMenuUrl, weeklyMenu).subscribe()
  }

  /**
   * deleteWeeklyMenu
   */
  public deleteWeeklyMenu(id: number) {
    this.httpClient.delete(this.weeklyMenuUrl + `/${id}`).subscribe()
  }
}
