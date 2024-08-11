import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}
  estadoSidebar: boolean = false;
  @Output() sidebarClickEmit = new EventEmitter<boolean>();

  sidebarClick() {
    this.estadoSidebar = !this.estadoSidebar;
    console.log(this.estadoSidebar);
    this.sidebarClickEmit.emit(this.estadoSidebar);
  }
  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.deleteAllTokens();
  }
}
