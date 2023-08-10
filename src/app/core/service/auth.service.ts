import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BaseResponse } from '../model/response/base-response';
import { UserRegDTO } from '../model/dto/user-reg-dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;
  currentUserSubject: BehaviorSubject<User | null>;
  currentUser: Observable<User | null>

  constructor(private httpClient: HttpClient, private router: Router) {
    const item = localStorage.getItem("currentUser")
    this.currentUserSubject = item ? new BehaviorSubject<User | null>(JSON.parse(item)) : new BehaviorSubject<User | null>(null)
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value
  }

  /**
   * setCurrentUserRole
   */
  public setCurrentUserRole(role: string) {
    if (this.currentUserSubject.value) {
      this.currentUserSubject.value.role = role
    }
  }

  isLoggedIn() {
    return localStorage.getItem("currentUser") !== null
  }

  isAdmin() {
    if (this.isLoggedIn()) {
      return this.currentUserSubject.value && this.currentUserSubject.value.role === "ADMIN"
    }

    return false
  }

  isChosenOne() {
    if (this.isLoggedIn()) {
      return this.currentUserSubject.value && this.currentUserSubject.value.role === "CHOSEN"
    }

    return false
  }

  login(email: string, password: string) {
    return this.httpClient.post(this.baseUrl + "/auth/login", { email, password }).pipe(map(resp => {
      const baseResponse = resp as BaseResponse<User>
      if (baseResponse.data == null) {
        localStorage.removeItem('currentUser')
        return null
      }

      const user = baseResponse.data as User
      localStorage.setItem('currentUser', JSON.stringify(user))
      this.currentUserSubject.next(user)

      return user
    }))
  }

  reserPassword(email: string) {
    return this.httpClient.post(this.baseUrl + "/auth/resetPassword", email).pipe(map(resp => {
      const baseResponse = resp as BaseResponse<string>
      if (baseResponse.data == null) {
        return baseResponse.message
      } else {
        return baseResponse.data
      }
    }))
  }

  logout() {
    localStorage.removeItem('currentUser')
    this.currentUserSubject.next(null)
  }

  register(user: UserRegDTO) {
    return this.httpClient.post(this.baseUrl + "/auth/register", user)
  }

  sendToken(token: string) {
    this.httpClient.post(this.baseUrl + "/confirmAccount", null, { params: { "token": token } }).subscribe({
      next: (resp) => {
        this.router.navigate(["/login"])
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.name + " " + err.message);
      }

    })
  }
}
