import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryModel, ProductModel } from '../../models/product';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productService = inject(ProductService);
  
  productList$: Observable<ProductModel[]> = new Observable<ProductModel[]>();
  categoryList$: Observable<CategoryModel[]> = new Observable<CategoryModel[]>();

  editProductForm: FormGroup;
  showEditModal = false;
  selectedProduct: any;

  constructor(private fb: FormBuilder) {
    this.editProductForm = this.fb.group({
      productName: ['', [Validators.required]],
      productPrice: ['', [Validators.required, Validators.min(0)]],
      productImageUrl: ['', [Validators.required]],
    });
  }

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

  openEditModal(product: any): void {
    this.selectedProduct = product;
    this.editProductForm.patchValue({
      productName: product.productName,
      productPrice: product.productPrice,
      productImageUrl: product.productImageUrl
    });
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  saveProductChanges(): void {
    if (this.editProductForm.valid) {
      const updatedProduct = {
        ...this.selectedProduct,
        ...this.editProductForm.value
      };
  
      const observer = {
        next: (response: any) => {
          alert('Product updated successfully');
          console.log("Response:", response);
          this.closeEditModal();
          window.location.reload(); 
        },
        error: (error: any) => {
          alert('Error updating product');
          console.error(error);
        },
        complete: () => {
          console.log('Update request completed');
        }
      };
  
      try {
        this.productService.updateProduct(updatedProduct).subscribe(observer);
      } catch (err) {
        console.error(err);
      }
    }
  }
  

  deleteProductById(productId: number): void {
    try {
      this.productService.deleteProduct(productId).subscribe(response => {
        if (response.result === false) {
          alert("Something went wrong, cannot delete this item");
        } else {
          console.log("Response: ", response);
          alert("Product deleted successfully");
          window.location.reload(); 
        }
      })
    } catch (err) {
      console.error(err);
    }
  }
}
