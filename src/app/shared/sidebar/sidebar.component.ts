import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  estadoSidebar: boolean = false;
  @Output() sidebarClickEmit = new EventEmitter<boolean>();

  sidebarClick() {
    this.estadoSidebar = !this.estadoSidebar;
    this.sidebarClickEmit.emit(this.estadoSidebar);
  }
}
