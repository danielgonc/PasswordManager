import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { PasswordsService } from '../passwords.service';

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
  showPassword: boolean = false;

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      name: [ this.password ? this.password.name : '', Validators.required],
      username: [ this.password ? this.password.username : '', Validators.required],
      url: [ this.password ? this.password.url : '', Validators.required],
      password: [ this.password ? this.password.password : '', Validators.required]
    });
  }

  closeForm(refresh: boolean) {
    this.closeModal.emit(refresh);
  }

  submitForm(): void {
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.valid) {

      if (this.password) {
        this.passwordService.updatePassword(this.password.id as string, this.passwordForm.value).subscribe(response => {
          this.closeForm(true);
        });
      }
      else {
        this.passwordService.addPassword(this.passwordForm.value).subscribe(response => {
          this.closeForm(true);
        });
      }
    }
  }

  deletePassword(): void {
    this.passwordService.deletePassword(this.password.id as string).subscribe(response => {
      this.closeForm(true);
    });
  }
}
