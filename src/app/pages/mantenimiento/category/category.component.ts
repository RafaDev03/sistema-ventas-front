import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { CategoryInterface } from '../../../interfaces/category.interface';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';
import { ModalProductComponent } from '../../../components/modal-product/modal-product.component';
import { ModalCategoryComponent } from '../../../components/modal-category/modal-category.component';
import { DataService } from '../../../services/data.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormField,
    MatInputModule,
    MatSortModule,
    MatPaginator,
    MatButtonModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit, AfterViewInit {
  constructor(
    private categoryService: CategoryService,
    private notificationsService: NotificationsService,
    private modalService: ModalService,
    private dataService: DataService
  ) {}
  dataSource!: MatTableDataSource<CategoryInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'Nombre', 'Acciones'];

  ngOnInit(): void {
    this.findAllCategories();
    this.dataService.dataUpdated$.subscribe({
      next: () => this.findAllCategories(),
      error: (err) => console.log(err),
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  findAllCategories() {
    this.categoryService.findAllCategories().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.log(err),
    });
  }

  deleteCategory(id: number, name: string) {
    this.notificationsService
      .showConfirmacionEliminar('Categoria', name)
      .then((confirm) => {
        if (confirm) {
          this.categoryService.deleteCategories(id).subscribe({
            next: (res: any) => {
              console.log(res), this.findAllCategories();
            },
            error: (err) => console.log(err),
          });
        }
      });
  }

  openModal(category?: any) {
    this.modalService.openModal(ModalCategoryComponent, category, false);
  }

  openModalEdit(category?: CategoryInterface) {
    this.modalService.openModal(ModalCategoryComponent, category, true);
  }
}
