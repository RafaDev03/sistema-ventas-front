import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ProviderInterface } from '../interfaces/provider.interface';
import { DataService } from './data.service';
import { tap } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(private http: HttpClient, private dataService: DataService) {}

  findAll() {
    return this.http.get(`${base_url}/proveedor/findAll`);
  }

  saveProvider(provider: ProviderInterface) {
    return this.http.post(`${base_url}/proveedor/save`, provider);
  }

  deleteProvider(id: number) {
    return this.http.delete(`${base_url}/proveedor/delete/${id}`);
  }

  updateProvicer(id: number, provider: ProviderInterface) {
    return this.http.put(`${base_url}/proveedor/update/${id}`, provider);
  }
}
