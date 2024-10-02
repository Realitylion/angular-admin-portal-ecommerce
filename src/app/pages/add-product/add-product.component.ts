import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryModel } from '../../models/product';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  
  productService = inject(ProductService);
  categoryList$: Observable<CategoryModel[]> = new Observable<CategoryModel[]>();
  
  addProductForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addProductForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      productPrice: ['', [Validators.required, Validators.min(0)]],
      productDescription: ['', Validators.required],
      productImageUrl: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryList$ = this.productService.getAllCategory().pipe(
      map(item => item.data)
    );
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      const newProduct = {
        ProductSku: `${this.addProductForm.value.productName}312`,
        ProductName: this.addProductForm.value.productName,
        ProductPrice: this.addProductForm.value.productPrice,
        ProductDescription: this.addProductForm.value.productDescription,
        ProductImageUrl: this.addProductForm.value.productImageUrl,
        CategoryId: this.addProductForm.value.categoryId,
      };

      this.productService.addProduct(newProduct).subscribe(response => {
        console.log('Product added successfully:', response);
        alert('Product added successfully');
      });
    }
  }
}
