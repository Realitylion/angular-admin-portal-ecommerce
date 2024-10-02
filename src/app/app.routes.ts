import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: ProductsComponent
    },
    {
        path: 'add-product',
        component: AddProductComponent
    },
    {
        path: 'add-category',
        component: AddCategoryComponent
    },
];
