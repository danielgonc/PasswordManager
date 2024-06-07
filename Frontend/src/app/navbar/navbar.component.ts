import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass'
})
export class NavbarComponent {
  showMenuMobile: boolean = false;

  toogleMenuMobile() {
    this.showMenuMobile = !this.showMenuMobile;
  }
}
