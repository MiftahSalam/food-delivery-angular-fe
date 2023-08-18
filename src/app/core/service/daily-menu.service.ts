import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DailyMenu } from '../model/daily-menu';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { BaseResponse } from '../model/response/base-response';
import { WeeklyMenuWithIds } from '../model/weekly-menu-with-ids';
import { AddDailyMenuDTO } from '../model/dto/add-daily-menu-dto';

@Injectable({
  providedIn: 'root'
})
export class DailyMenuService {
  baseUrl = environment.baseUrl + "/daily-menu"
  dataChange = new BehaviorSubject<DailyMenu[] | null>(null)
  dataChangeMenu = new BehaviorSubject<DailyMenu | null>(null)
  dataChangeDay = new BehaviorSubject<Date[]>([])
  dataChangeDailyMenu = new BehaviorSubject<DailyMenu[] | null>(null)
  successEmitter = new Subject<DailyMenu>()

  constructor(private httpClient: HttpClient) { }

  /**
   * getDailyMenu
   */
  public getDailyMenu(): Observable<DailyMenu | null> {
    this.httpClient.get(
      this.baseUrl, {
      observe: 'response',
      responseType: 'json'
    }).subscribe({
      next: (resp) => {
        const baseResponse = resp.body as BaseResponse<DailyMenu>

        this.dataChangeMenu.next(baseResponse.data)
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.name + " " + err.message);
      }
    })

    return this.dataChangeMenu.asObservable()
  }

  /**
   * getDailyMenus
   */
  public getDailyMenus(weeklyMenu: WeeklyMenuWithIds): Observable<DailyMenu[] | null> {
    return this.httpClient.get(
      this.baseUrl + `/all/${weeklyMenu.id}`,
      { observe: 'response', responseType: 'json' }
    )
      .pipe(
        map(resp => {
          const baseResponse = resp.body as BaseResponse<DailyMenu[]>
          if (resp.status !== HttpStatusCode.Created && resp.status !== HttpStatusCode.Ok) {
            if (baseResponse) {
              throwError(() => new Error("Error occurred with error: " + baseResponse.message))
            } else {
              throwError(() => new Error("Error occurred with error: " + resp.statusText))
            }
          }

          return baseResponse.data
        }),
        catchError((err: HttpErrorResponse) => {
          console.log(err.message)
          return throwError(() => new Error("Error occurred with error: " + err.error.message))
        })

      )
  }

  /**
   * getDays
   */
  public getDays(weeklyMenu: WeeklyMenuWithIds): Observable<Date[]> {
    this.httpClient.get(this.baseUrl + `/days/${weeklyMenu.id}`).subscribe({
      next: (resp) => {
        const baseResponse = resp as BaseResponse<Date[]>

        this.dataChangeDay.next(baseResponse.data)
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.name + " " + err.message);
      }
    })

    return this.dataChangeDay.asObservable()
  }

  /**
   * addDailyMenu
   */
  public addDailyMenu(dailyMenu: AddDailyMenuDTO) {
    return this.httpClient.post(this.baseUrl, dailyMenu)
  }

  /**
   * updateDailyMenu
   */
  public updateDailyMenu(dailyMenu: DailyMenu) {
    return this.httpClient.put(this.baseUrl, dailyMenu)
  }

  /**
   * deleteDailyMenu
   */
  public deleteDailyMenu(id: number) {
    this.httpClient.delete(this.baseUrl + `/${id}`)
  }
}
