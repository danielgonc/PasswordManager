import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [NgIf, FormComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.sass',
  animations: [
    trigger('openPanel', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)'}),
        animate('500ms', style({opacity: 0, transform: 'scale(0.95)'}))
      ])
    ])
  ]
})
export class CardsComponent {
  @Input() password!: any;
  @Output() refreshPasswords: EventEmitter<any> = new EventEmitter();

  showForm: boolean = false;

  private _showAddOption = false;

  @Input('showAddOption')
  get showAddOption(): boolean {
    return this._showAddOption;
  }
  set showAddOption(value: boolean) {
    this._showAddOption = "" + value !== "false";
  }

  parseFavicon(url: string): string {
    if (url.indexOf('http') > -1) {
      const { hostname } = new URL(url);

      return `//${hostname}/favicon.ico`;
    }

    return "";
  }

  openForm() {
    this.showForm = true;
  }

  closeModalAndRefresh(refresh: boolean) {
    this.showForm = false;

    if(refresh) {
      this.refreshPasswords.emit();
    }
  }
}
