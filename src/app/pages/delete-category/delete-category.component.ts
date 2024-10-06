import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryModel } from '../../models/product';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-category',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.css'
})
export class DeleteCategoryComponent {
  
  
  productService = inject(ProductService);
  categoryList$: Observable<CategoryModel[]> = new Observable<CategoryModel[]>();
  
  deleteCategoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.deleteCategoryForm = this.fb.group({
      categoryId: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    this.categoryList$ = this.productService.getAllCategory().pipe(
      map(item => item.data)
    );
  }

  onSubmit(): void {
    if (this.deleteCategoryForm.valid) {
      // const newCategory = {
      //   CategoryName: this.deleteCategoryForm.value.categoryName,
      // };

      const categoryId = this.deleteCategoryForm.value.categoryId;
      console.log(categoryId);

      try {
        this.productService.deleteCategory(categoryId).subscribe(response => {
          if (response.message !== "Category Deleted") {
            alert('Delete all items in the category before deleting it');
          } else {
            console.log('Category removed successfully:', response);
            alert('Category removed successfully');
            window.location.reload();
          }
        });
      } catch (err) {
        console.error(err)
      }
    }
  }
}
