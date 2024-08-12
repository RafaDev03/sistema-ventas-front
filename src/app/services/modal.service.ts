import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly dialog = inject(MatDialog);

  constructor() {}

  openModal(component: any, data?: any, isEditing = false): void {
    const config = { data, isEditing };
    console.log(config);
    this.dialog.open(component, {
      width: '500px',
      data: config,
    });
  }

  closeModal(): void {
    this.dialog.closeAll();
  }
}
