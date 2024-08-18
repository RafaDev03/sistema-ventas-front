import { Component, inject, OnInit } from '@angular/core';
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
import { ProviderService } from '../../services/provider.service';
import { ProviderInterface } from '../../interfaces/provider.interface';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../services/category.service';
import { CategoryInterface } from '../../interfaces/category.interface';

@Component({
  selector: 'app-modal-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
  ],
  templateUrl: './modal-product.component.html',
  styleUrl: './modal-product.component.css',
})
export class ModalProductComponent implements OnInit {
  productForm!: FormGroup;
  providers: ProviderInterface[] = [];
  categories: CategoryInterface[] = [];
  private readonly dialogData = inject(MAT_DIALOG_DATA);
  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private providerService: ProviderService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.buildForm();
    this.productForm.patchValue(this.dialogData.data);
    this.findAllProviders();
    this.findAllCategories();
  }

  onCancel() {
    this.modalService.closeModal();
  }
  saveProduct() {
    console.log(this.productForm.value);
  }

  private buildForm(): void {
    this.productForm = this.fb.nonNullable.group({
      nombre: ['', Validators.required],
      precio: [0.0, Validators.required],
      stock: [0, [Validators.required]],
      categoria: [null, [Validators.required]],
      proveedores: [null, [Validators.required]],
      marca: [null, [Validators.required]],
    });
  }

  getTitle() {
    return this.dialogData.data ? 'Editar' : 'Agregar';
  }

  findAllProviders() {
    this.providerService.findAll().subscribe({
      next: (res: any) => {
        this.providers = res.data;
        console.log(this.providers);
      },
    });
  }

  findAllCategories() {
    this.categoryService.findAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data;
      },
      error: (err) => console.log(err),
    });
  }
}
