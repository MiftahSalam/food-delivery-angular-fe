import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../model/dto/user-dto';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../model/response/base-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl
  dataChange: BehaviorSubject<UserDTO[]> = new BehaviorSubject<UserDTO[]>([])
  dataChangeUser: BehaviorSubject<UserDTO | null> = new BehaviorSubject<UserDTO | null>(null)
  dataChangeImage: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<UserDTO[]> {
    this.httpClient.get(this.baseUrl+'/users/all').subscribe({next: (resp) => {
      const baseResponse = resp as BaseResponse<UserDTO[]>

      this.dataChange.next(baseResponse.data || [])
    }, error: (err)  =>{
      console.error("UserService-getUsers error: "+err)
    }
    , complete: () => {
      console.info("UserService-getUsers complete")
    }})

    return this.dataChange.asObservable();
  }

  /**
   * getUser
   */
  public getUser(email: string): Observable<UserDTO | null> {
    this.httpClient.get(this.baseUrl+"/users/email/"+email).subscribe({
      next: (resp) => {
        const baseResponse = resp as BaseResponse<UserDTO>

        this.dataChangeUser.next(baseResponse.data || null)
        }
    })

    return this.dataChangeUser.asObservable()
  }
}
