import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PasswordsService } from './passwords.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'Password manager';
  passwords: any = [];

  constructor(private passwordService: PasswordsService) { }

  fetchPasswords(): void {
    this.passwordService.getPasswords().subscribe((data: any) => {
      this.passwords = data;
    });
  }

  parseFavicon(url: string): string {
    if (url.indexOf('http') > -1) {
      const { hostname } = new URL(url);

      return `//${hostname}/favicon.ico`;
    }

    return "";
  }

  ngOnInit() {
    this.fetchPasswords();
  }
}
