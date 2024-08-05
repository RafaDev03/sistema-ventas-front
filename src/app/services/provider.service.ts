import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ProviderInterface } from '../interfaces/provider.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get(`${base_url}/proveedor/findAll`, this.headers);
  }

  saveProvider(provider: ProviderInterface) {
    return this.http.post(`${base_url}/proveedor/save`, provider, this.headers);
  }

  deleteProvider(id: number) {
    return this.http.delete(`${base_url}/proveedor/delete/${id}`, this.headers);
  }

  updateProvicer(id: number, provider: ProviderInterface) {
    return this.http.put(
      `${base_url}/proveedor/update/${id}`,
      provider,
      this.headers
    );
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
