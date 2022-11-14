import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  constructor(private readonly userService: UsersService) {}
  displayedColumns: string[] = [
    'position',
    'username',
    'email',
    'phone',
    'company',
  ];

  usersList: any[] = [];

  ngOnInit(): void {
    this.userService.users.subscribe((users) => {
      this.usersList = users;
    });
  }
}
