import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PasswordsService } from './passwords.service';
import { NgFor, NgIf } from '@angular/common';
import { CardsComponent } from './cards/cards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgFor, NgIf, CardsComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'Password manager';
  passwords: any[] = [];

  filter: string;

  constructor(private passwordService: PasswordsService) { }

  fetchPasswords(): void {
    this.passwordService.getPasswords().subscribe((data: any) => {
      this.passwords = data;
    });
  }

  passwordsFiltered(): any[] {
    return this.passwords.filter(f => !this.filter || f.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1);
  }

  ngOnInit() {
    this.fetchPasswords();
  }
}
