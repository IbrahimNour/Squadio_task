import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { find, takeUntil } from 'rxjs';
import { ComponentBase } from 'src/app/shared/common-base';
import { PRODUCT } from './../../core/models/products';
import { ProductsService } from './../../core/services/products/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent extends ComponentBase implements OnInit {
  constructor(
    private readonly productService: ProductsService,
    private readonly toastr: ToastrService
  ) {
    super();
  }

  productList!: PRODUCT[];
  product!: PRODUCT | null;
  productId!: number;
  showForm!: boolean;

  ngOnInit(): void {
    this.productService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe((productList) => {
        this.productList = productList;
      });
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
    this.toastr.success('Changes saved successfully');
  }

  addNewProduct(): void {
    this.product = null;
    this.showForm = true;
  }

  onDeletedProduct(product: PRODUCT): void {
    const productIdx = this.productList.findIndex(
      (item) => item.id === product.id
    );
    this.productList.splice(productIdx, 1);
    this.productService.products$.next(this.productList);
    this.toastr.success('Product deleted successfully');
  }

  onCancelForm(): void {
    this.productId = -1;
    this.showForm = false;
  }

  onProductListChange(event: any): void {
    const productId = event?.value;
    this.showForm = true;

    if (productId) {
      this.product = this.productList.filter(
        (product) => productId === product.id
      )[0];
      console.log('filter => ', this.product);
    }
  }
}
