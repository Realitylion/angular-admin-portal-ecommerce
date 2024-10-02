import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryModel, ProductModel } from '../../models/product';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productService = inject(ProductService);
  
  productList$: Observable<ProductModel[]> = new Observable<ProductModel[]>();
  categoryList$: Observable<CategoryModel[]> = new Observable<CategoryModel[]>();

  ngOnInit(): void {
    this.productList$ = this.productService.getAllProducts().pipe(
      map(item => item.data)
    );
    this.categoryList$ = this.productService.getAllCategory().pipe(
      map(item => item.data)
    );
  }

  getProductByCategory(categoryId: number): void {
    this.productList$ = this.productService.getAllProductsByCategoryName(categoryId).pipe(
      map(item => item.data)
    );
  }

  getAllProducts(): void {
    this.productList$ = this.productService.getAllProducts().pipe(
      map(item => item.data)
    );
  }
}
