import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PasswordsService } from './passwords.service';
import { NgFor, NgIf } from '@angular/common';
import { CardsComponent } from './cards/cards.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgFor, NgIf, CardsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'Password manager';
  passwords: any = [];

  constructor(private passwordService: PasswordsService) { }

  fetchPasswords(): void {
    this.passwordService.getPasswords().subscribe((data: any) => {
      console.log(data);
      this.passwords = data;
    });
  }

  ngOnInit() {
    this.fetchPasswords();
  }
}
