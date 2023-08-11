import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Type } from '../model/type';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BaseResponse } from '../model/response/base-response';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  baseUrl = environment.baseUrl + "/types"
  dataChange: BehaviorSubject<Type[] | null> = new BehaviorSubject<Type[] | null>(null)
  dataChangeRegular: BehaviorSubject<Type[] | null> = new BehaviorSubject<Type[] | null>(null)
  updateSuccessEmitter = new Subject<Type>()
  addSuccessEmitter = new Subject<Type>()

  constructor(private httpClient: HttpClient) { }

  /**
   * getAllType
   */
  public getAllType(): Observable<Type[] | null> {
    this.httpClient.get(this.baseUrl + "/all").subscribe({
      next: (resp) => {
        const baseResponse = resp as BaseResponse<Type[]>

        this.dataChange.next(baseResponse.data)
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.name + " " + err.message);
      }
    })

    return this.dataChange.asObservable()
  }

  /**
   * addType
   */
  public addType(type: Type) {
    return this.httpClient.post(this.baseUrl, type)
  }

  public updateType(type: Type) {
    return this.httpClient.put(this.baseUrl, type)
  }

  /**
   * updateRegularType
   */
  public updateRegularType(types: Type[]) {
    return this.httpClient.put(this.baseUrl + '/regularTypes', types)
  }

  /**
   * deleteType
   */
  public deleteType(id: number) {
    this.httpClient.delete(this.baseUrl + `/${id}`).subscribe()
  }

  /**
   * getRegularTypes
   */
  public getRegularTypes() {
    this.httpClient.get(this.baseUrl + '/regular').subscribe({
      next: (resp) => {
        const baseResponse = resp as BaseResponse<Type[]>

        this.dataChangeRegular.next(baseResponse.data)
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.name + " " + err.message);
      }

    })

    return this.dataChangeRegular.asObservable()
  }
}
