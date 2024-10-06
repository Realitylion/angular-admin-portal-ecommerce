import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = "https://freeapi.miniprojectideas.com/api/BigBasket/";
  
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiUrl + "GetAllProducts");
  }

  getAllCategory(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiUrl + "getAllCategory");
  }
  
  getAllProductsByCategoryName(categoryId: number): Observable<APIResponseModel> {
    const url = `${this.apiUrl}GetAllProductsByCategoryId?id=${categoryId}`;
    return this.http.get<APIResponseModel>(url);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl + "CreateProduct", product);
  }

  deleteProduct(productId: number): Observable<APIResponseModel> {
    const url = `${this.apiUrl}DeleteProductById?id=${productId}`;
    return this.http.get<APIResponseModel>(url);
  }

  addCategory(category: any): Observable<any> {
    return this.http.post(this.apiUrl + "CreateNewCategory", category);
  }

  deleteCategory(categoryId: number | undefined): Observable<APIResponseModel> {
    const url = `${this.apiUrl}DeleteCategoryById?id=${categoryId}`;
    return this.http.get<APIResponseModel>(url);
  }
}
