import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ProductService } from '../../../services/product.service';
import { ProductInterface } from '../../../interfaces/product.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ModalService } from '../../../services/modal.service';
import { ModalProductComponent } from '../../../components/modal-product/modal-product.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'precio',
    'stock',
    'categoria',
    'proveedores',
    'marca',
    'Acciones',
  ];

  dataSource!: MatTableDataSource<ProductInterface>;
  constructor(
    private productService: ProductService,
    private modalService: ModalService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.findAllProducts();
  }

  findAllProducts() {
    this.productService.findAllProducts().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.dataSource = new MatTableDataSource(res.data);
      },
      error: (err) => console.log(err),
    });
  }
  abrirModal(product?: any) {
    this.modalService.openModal(ModalProductComponent, product, false);
  }
}
