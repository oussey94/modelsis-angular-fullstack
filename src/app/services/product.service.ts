import { Product } from './../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductType } from '../models/productType.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public readonly url_product:string='http://localhost:9090/products';

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url_product);
  }

  public getProductById(id: number): Observable<Product>{
    const url = `${this.url_product}/${id}`;
    return this.http.get<Product>(url);
  }

  public addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.url_product, product);
  }

  public updateProduct(id: number, product: Product): Observable<Product>{
    const url= `${this.url_product}/${id}`
    return this.http.put<Product>(url, product);
  }

  public deleteProduct(id: number): Observable<{}>{
    const url= `${this.url_product}/${id}`
    return this.http.delete<{}>(url);
  }


  //**************  Partie concernant type de produit  ************/

  public getAllProductsType(): Observable<ProductType[]>{
    const url = this.url_product+"/allTypeProducts";

    return this.http.get<ProductType[]>(url);
  }

  public addProductType(productType: ProductType): Observable<ProductType>{
    const url = this.url_product+"/productType";

    return this.http.post<ProductType>(url, productType);
  }

}
