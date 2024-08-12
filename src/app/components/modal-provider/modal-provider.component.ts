import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProviderService } from '../../services/provider.service';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ModalService } from '../../services/modal.service';
import { DataService } from '../../services/data.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-modal-provider',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './modal-provider.component.html',
  styleUrl: './modal-provider.component.css',
})
export class ModalProviderComponent {
  providerForm!: FormGroup;
  private readonly dialogData = inject(MAT_DIALOG_DATA);
  constructor(
    private fb: FormBuilder,
    private providerService: ProviderService,
    private modalService: ModalService,
    private notificationsService: NotificationsService,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.buildForm();
    this.providerForm.patchValue(this.dialogData.data);
  }

  getTitle(): string {
    return this.dialogData.data ? 'Editar' : 'Agregar';
  }

  guardarProvider() {
    let mensaje = '';
    const provider = this.providerForm.value;
    if (!this.dialogData.data) {
      this.providerService.saveProvider(provider).subscribe((resp) => {
        this.modalService.closeModal();
        this.dataService.notificar();
        this.notificationsService.showSuccess(
          'Proveedor guardado correctamente'
        );
      });
    } else {
      this.providerService
        .updateProvicer(this.dialogData.data.id, provider)
        .subscribe((resp) => {
          this.modalService.closeModal();
          this.dataService.notificar();
          this.notificationsService.showSuccess(
            'Proveedor actualizado correctamente'
          );
        });
    }
  }

  private buildForm(): void {
    this.providerForm = this.fb.nonNullable.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      ruc: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  onCancel() {
    this.modalService.closeModal();
  }

  save() {}
}
