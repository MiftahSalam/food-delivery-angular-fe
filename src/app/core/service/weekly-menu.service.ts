import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, throwError } from 'rxjs';
import { WeeklyMenu } from '../model/weekly-menu';
import { WeeklyMenuWithIds } from '../model/weekly-menu-with-ids';
import { DailyMenu } from '../model/daily-menu';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { BaseResponse } from '../model/response/base-response';

@Injectable({
  providedIn: 'root'
})
export class WeeklyMenuService {
  dataChange: BehaviorSubject<WeeklyMenu | null> = new BehaviorSubject<WeeklyMenu | null>(null)
  dataChangeImage: BehaviorSubject<any> = new BehaviorSubject<any>(null)
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
        console.log(baseResponse.data.from);

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
    return this.httpClient.post(
      this.baseUrl + "/files/WEEKLY-MENU",
      image,
      { observe: 'response', responseType: 'json' })
      .pipe(
        map(resp => {
          const baseResponse = resp.body as BaseResponse<string>
          if (resp.status !== HttpStatusCode.Ok) {
            if (baseResponse) {
              throwError(() => new Error("Error occurred with error: " + baseResponse.message))
            } else {
              throwError(() => new Error("Error occurred with error: " + resp.statusText))
            }
          }

          this.dataChangeImage.next(baseResponse.data)
          return baseResponse.data
        }),
        catchError((err: HttpErrorResponse) => {
          console.log(err.message)
          this.dataChangeImage.next(null)
          return throwError(() => new Error("Error occurred with error: " + err.error.message))
        })
      )
  }

  /**
   * addWeeklyMenu
   */
  public addWeeklyMenu(weeklyMenu: WeeklyMenu) {
    return this.httpClient.post(
      this.weeklyMenuUrl,
      weeklyMenu,
      {
        observe: 'response', responseType: 'json'
      }).pipe(
        map(resp => {
          const baseResponse = resp.body as BaseResponse<WeeklyMenuWithIds>
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
