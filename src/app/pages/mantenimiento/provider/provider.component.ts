import { Component, inject, OnInit } from '@angular/core';
import { ProviderService } from '../../../services/provider.service';
import { ProviderInterface } from '../../../interfaces/provider.interface';
import { ModalService } from '../../../components/modal/modal.service';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-provider',
  standalone: true,
  imports: [],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.css',
})
export class ProviderComponent implements OnInit {
  public providers: ProviderInterface[] = [];
  constructor(
    private providerService: ProviderService,
    private modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.findProviders();
  }

  openModal() {
    this.modalService.openModal<ModalComponent, ProviderInterface>(
      ModalComponent
    );
  }

  findProviders() {
    this.providerService.findAll().subscribe((resp: any) => {
      this.providers = resp.data;
    });
  }
}
