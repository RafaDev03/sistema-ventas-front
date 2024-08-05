import { Component, inject, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
const MATERIAL_MODULES = [MatLabel, MatFormField, MatInput, MatDialogModule];

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MATERIAL_MODULES, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  prividerForm!: FormGroup;
  private readonly dialogData = inject(MAT_DIALOG_DATA);
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.buildForm();
  }

  getTitle(): string {
    return this.dialogData.data ? 'Editar' : 'Agregar';
  }

  private buildForm(): void {
    this.prividerForm = this.fb.nonNullable.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      ruc: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }
}
