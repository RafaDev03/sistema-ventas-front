import { Component, inject, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { DataService } from '../../services/data.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-modal-category',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-category.component.html',
  styleUrl: './modal-category.component.css',
})
export class ModalCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  private readonly dialogData = inject(MAT_DIALOG_DATA);

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private modalService: ModalService,
    private dataService: DataService,
    private notificacionService: NotificationsService
  ) {}
  ngOnInit(): void {
    this.buildForm();
    this.categoryForm.patchValue(this.dialogData.data);
  }

  private buildForm(): void {
    this.categoryForm = this.fb.nonNullable.group({
      nombre: ['', Validators.required],
    });
  }

  guardarCategory() {
    const category = this.categoryForm.value;
    if (!this.dialogData.data) {
      this.categoryService.saveProvider(category).subscribe({
        next: (res: any) => {
          console.log(res);
          this.dataService.notificar();
          this.modalService.closeModal();
          this.notificacionService.showSuccess(
            'Registro guardado correctamente'
          );
        },
        error: (err) => {
          console.log(err), console.log('Error');
        },
      });
    } else {
      this.categoryService
        .updateCategory(this.dialogData.data.id, category)
        .subscribe({
          next: (res: any) => {
            this.dataService.notificar();
            this.modalService.closeModal();
            this.notificacionService.showSuccess(
              'Registro Actualizado correctamente'
            );
          },
        });
    }
  }

  onCancel() {
    this.modalService.closeModal();
  }

  getTitle() {
    return this.dialogData.data ? 'Editar' : 'Agregar';
  }
}
