import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { CategoryInterface } from '../../../interfaces/category.interface';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';
import { ModalProductComponent } from '../../../components/modal-product/modal-product.component';
import { ModalCategoryComponent } from '../../../components/modal-category/modal-category.component';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private notificationsService: NotificationsService,
    private modalService: ModalService,
    private dataService: DataService
  ) {}
  categories: CategoryInterface[] = [];

  ngOnInit(): void {
    this.findAllCategories();
    this.dataService.dataUpdated$.subscribe({
      next: () => this.findAllCategories(),
      error: (err) => console.log(err),
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
