import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../model/dto/user-dto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BaseResponse } from '../model/response/base-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl
  baseUserUrl = this.baseUrl + '/users'
  dataChange: BehaviorSubject<UserDTO[]> = new BehaviorSubject<UserDTO[]>([])
  dataChangeUser: BehaviorSubject<UserDTO | null> = new BehaviorSubject<UserDTO | null>(null)
  dataChangeImage: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<UserDTO[]> {
    this.httpClient.get(this.baseUserUrl + '/all').subscribe({
      next: (resp) => {
        const baseResponse = resp as BaseResponse<UserDTO[]>

        this.dataChange.next(baseResponse.data || [])
      }, error: (err) => {
        console.error("UserService-getUsers error: " + err)
      }
      , complete: () => {
        console.info("UserService-getUsers complete")
      }
    })

    return this.dataChange.asObservable();
  }

  /**
   * getUser
   */
  public getUser(email: string): Observable<UserDTO | null> {
    this.httpClient.get(this.baseUserUrl + "/email/" + email).subscribe({
      next: (resp) => {
        const baseResponse = resp as BaseResponse<UserDTO>

        this.dataChangeUser.next(baseResponse.data || null)
      }
    })

    return this.dataChangeUser.asObservable()
  }

  /**
   * updateUserEmail
   */
  public updateUserEmail(id: number, email: string) {
    return this.httpClient.put(this.baseUserUrl + `/${id}`, email)
  }

  /**
   * updateUserImage
   */
  public updateUserImage(id: number, imagePath: string) {
    return this.httpClient.put(this.baseUserUrl + `/${id}/image`, imagePath)
  }

  /**
   * updatePassword
   */
  public updatePassword(password: string, token: string) {
    return this.httpClient.put(this.baseUserUrl + `/updatePassword/${token}`, password)
  }

  /**
   * addImage
   */
  public addImage(image: FormData) {
    this.httpClient.post(this.baseUrl + '/files/AVATAR', image).subscribe({
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
   * getImage
   */
  public getImage(imagePath: string) {
    this.httpClient.get(this.baseUrl + '/files', { params: { "imagePath": imagePath } }).subscribe({
      next: (resp) => {
        const baseResponse = resp as BaseResponse<string>

        this.dataChangeImage.next(baseResponse.data)
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.name + " " + err.message);
      }
    })
  }
}
