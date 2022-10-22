import { PRODUCT } from './../../models/products';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  private INITIAL_STATE: PRODUCT[] = [
    {
      id: Date.now(),
      name: 'product 1',
      type: 1,
      category: 'Cat 1',
      isSubCategory: true,
      password: '123456',
      referenceId: '12444',
      fees: 100,
      discound: 10,
    },
    {
      id: Date.now() + 2,
      name: 'product 2',
      type: 1,
      category: 'Cat 2',
      isSubCategory: false,
      password: '12345',
      fees: 80,
      referenceId: '1200',
      discound: 10,
    },
  ];

  products$ = new BehaviorSubject<PRODUCT[]>(this.INITIAL_STATE);
}
