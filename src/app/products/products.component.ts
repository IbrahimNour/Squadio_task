import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { PRODUCT } from '../core/models/products';
import { ProductsService } from '../core/services/products/products.service';
import { ComponentBase } from '../shared/common-base';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends ComponentBase implements OnInit {
  constructor(private readonly productService: ProductsService) {
    super();
  }

  productList!: PRODUCT[];
  product!: PRODUCT;
  productId!: number;
  showProductForm: boolean = false;

  ngOnInit(): void {
    this.productService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe((productList) => {
        this.productList = productList;
      });

    console.log('list => ', this.productList);
  }

  onAddedProduct(product: PRODUCT): void {
    const index = this.productList.findIndex((item) => item.id === product.id);
    if (index === -1) {
      const updatedProducts = [...this.productList, product];
      this.productService.products$.next(updatedProducts);
    } else {
      this.productList[index] = product;
      this.productService.products$.next(this.productList);
    }
  }

  onDeletedProduct(product: PRODUCT): void {
    const productIdx = this.productList.findIndex(
      (item) => item.id === product.id
    );
    this.productList.splice(productIdx, 1);
    this.productService.products$.next(this.productList);
  }

  onCancelForm(): void {
    this.showProductForm = false;
    this.productId = -1;
  }

  onProductListChange(event: any): void {
    const productId = event?.value;
    this.showProductForm = true;

    if (productId) {
      this.product = this.productList.filter(
        (product) => productId === product.id
      )[0];
    }
  }
}
