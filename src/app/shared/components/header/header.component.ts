import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserDTO } from 'src/app/core/model/dto/user-dto';
import { AuthService } from 'src/app/core/service/auth.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = {} as UserDTO;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.isLoggedIn()) {
          this.userService.getUser(this.authService.currentUserSubject.value?.email || "").subscribe(user => {
            if (user) {
              this.user = user
            }
          })
        }
      }
    })
  }

  isLoggedIn() {
    return this.authService.isLoggedIn()
  }

  isAdmin() {
    return this.authService.isAdmin()
  }

  isChosen() {
    return this.authService.isChosenOne()
  }

  onLogout() {
    this.authService.logout()
    this.router.navigate(["/auth/login"])
  }
}
