import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent implements OnInit {
  
  productService = inject(ProductService);
  
  addCategoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addCategoryForm = this.fb.group({
      categoryName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.addCategoryForm.valid) {
      const newCategory = {
        CategoryName: this.addCategoryForm.value.categoryName,
      };

      this.productService.addCategory(newCategory).subscribe(response => {
        console.log('Category added successfully:', response);
        alert('Category added successfully');
      });
    }
  }
}
