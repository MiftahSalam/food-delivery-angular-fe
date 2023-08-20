import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { UserDTO } from 'src/app/core/model/dto/user-dto';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  isDataAvailable = false
  displayedColumns = ["name", "lastname", "email", "status", "role"]
  dataSource = new MatTableDataSource<UserDTO>
  users = [] as UserDTO[]
  @ViewChild(MatSort, { static: true }) sort = {} as MatSort

  constructor(
    private userService: UserService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('search',
      sanitizer.bypassSecurityTrustResourceUrl('assets/search.svg')
    )
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      if (data && data.length > 0) {
        this.users = data
        const rawCurrentUser = localStorage.getItem("currentUser")
        const currentUser: User = rawCurrentUser ? JSON.parse(rawCurrentUser) : {}
        if (currentUser) {
          this.users = this.users.filter(user => user.email != currentUser.email)
        }
        this.dataSource = new MatTableDataSource(this.users)
        this.dataSource.sort = this.sort
        this.isDataAvailable = true
      }
    })
  }

  appyFilter(target: any) {
    this.dataSource.filter = target.value.trim().toLowerCase()
  }

  updateStatus(user: UserDTO) {
    for (let i = 0; i < this.users.length; i++) {
      if (user.id == this.users[i].id) {
        if (this.users[i].status == 3) {
          this.userService.updateUserStatus(this.users[i].id, "ACTIVE")
          this.users[i].status = 1
        } else {
          this.userService.updateUserStatus(this.users[i].id, "BAN")
          this.users[i].status = 3
        }
      }
    }
  }

  updateRole(user: UserDTO) {
    for (let i = 0; i < this.users.length; i++) {
      if (user.id == this.users[i].id) {
        if (this.users[i].role == "ADMIN") {
          this.userService.updateUserStatus(this.users[i].id, "DEMOTION")
          this.users[i].role = 'USER'
        } else {
          this.userService.updateUserStatus(this.users[i].id, "PROMOTE")
          this.users[i].role = "ADMIN"
        }
      }
    }
  }
}
