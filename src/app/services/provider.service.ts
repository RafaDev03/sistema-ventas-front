import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get(`${base_url}/proveedor/findAll`, this.headers);
  }

  get headers() {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
}
