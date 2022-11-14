import { USER } from './../models/users';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  initial_state: USER[] = [
    {
      id: 1,
      email: 'user1@test.com',
      company: 'Squadio',
      username: 'Test_1',
      phone: '0123456789',
    },
    {
      id: 2,
      email: 'user2@test.com',
      company: 'Squadio',
      username: 'Test_2',
      phone: '0123456000',
    },
    {
      id: 3,
      email: 'user3@test.com',
      company: 'Squadio',
      username: 'Test_3',
      phone: '0123456450',
    },
  ];

  users = new BehaviorSubject<USER[]>(this.initial_state);
}
