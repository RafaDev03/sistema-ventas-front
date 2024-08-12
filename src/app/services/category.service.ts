import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  URL_CATEGORY_DELETE,
  URL_CATEGORY_FIND_ALL,
  URL_CATEGORY_SAVE,
  URL_CATEGORY_UPDATE,
} from './urls';
import { CategoryInterface } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  findAllCategories() {
    return this.http.get(URL_CATEGORY_FIND_ALL);
  }

  deleteCategories(id: number) {
    return this.http.delete(`${URL_CATEGORY_DELETE}/${id}`);
  }

  saveProvider(categoryForm: CategoryInterface) {
    return this.http.post(`${URL_CATEGORY_SAVE}`, categoryForm);
  }

  updateCategory(id: number, categoryForm: CategoryInterface) {
    return this.http.put(`${URL_CATEGORY_UPDATE}/${id}`, categoryForm);
  }
}
