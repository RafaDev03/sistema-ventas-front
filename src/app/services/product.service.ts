import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_PRODUCT_FIND_ALL } from './urls';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  findAllProducts() {
    return this.http.get(URL_PRODUCT_FIND_ALL);
  }
}
