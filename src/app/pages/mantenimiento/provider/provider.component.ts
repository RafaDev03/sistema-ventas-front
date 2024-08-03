import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../../services/provider.service';
import { ProviderInterface } from '../../../interfaces/provider.interface';

@Component({
  selector: 'app-provider',
  standalone: true,
  imports: [],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.css',
})
export class ProviderComponent implements OnInit {
  public providers: ProviderInterface[] = [];

  constructor(private providerService: ProviderService) {}
  ngOnInit(): void {
    this.findProviders();
  }

  findProviders() {
    this.providerService.findAll().subscribe((resp: any) => {
      this.providers = resp.data;
    });
  }
}
