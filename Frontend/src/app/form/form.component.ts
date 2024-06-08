import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { PasswordsService } from '../passwords.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.sass',
})
export class FormComponent {
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Input() password: any;

  constructor(private formBuilder: FormBuilder, private passwordService: PasswordsService) { }

  passwordForm: any;

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      url: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  closeForm(refresh: boolean) {
    this.closeModal.emit(refresh);
  }

  submitForm(): void {
    if (this.passwordForm.valid) {

      if (this.password) {
        this.passwordService.updatePassword(this.password.id as string, this.passwordForm.value).subscribe(response => {
          console.log(response)
          this.closeForm(true);
        });
      }
      else {
        this.passwordService.addPassword(this.passwordForm.value).subscribe(response => {
          console.log(response)
          this.closeForm(true);
        });
      }
    }
  }
}
