import { Component, inject, OnInit } from '@angular/core';
import { ProviderService } from '../../../services/provider.service';
import { ProviderInterface } from '../../../interfaces/provider.interface';
import { ModalService } from '../../../services/modal.service';
import { ModalProviderComponent } from '../../../components/modal-provider/modal-provider.component';
import { DataService } from '../../../services/data.service';
import { NotificationsService } from '../../../services/notifications.service';

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
    private modalService: ModalService,
    private dataService: DataService,
    private notificationsService: NotificationsService
  ) {}
  ngOnInit(): void {
    this.findProviders();
    this.dataService.dataUpdated$.subscribe(() => {
      this.findProviders();
    });
  }

  openModal(provider?: any): void {
    this.modalService.openModal(ModalProviderComponent, provider, false);
  }

  editProvider(provider?: ProviderInterface) {
    this.modalService.openModal(ModalProviderComponent, provider, true);
  }

  findProviders() {
    this.providerService.findAll().subscribe((resp: any) => {
      this.providers = resp.data;
    });
  }

  deleteProvider(id: number, name: string) {
    this.notificationsService
      .showConfirmacionEliminar('Proveedor', name)
      .then((confirmed) => {
        if (confirmed) {
          this.providerService.deleteProvider(id).subscribe((resp: any) => {
            if (resp.estatus) {
              this.findProviders();
            }
          });
        }
      });
  }
}
