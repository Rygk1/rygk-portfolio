import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

interface Contact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  @Input() set contact(valor: any) {
    alert(valor);
  }

  myForm: FormGroup = new FormGroup({
    firstName: new FormControl(0, [Validators.required, Validators.max(10)]),
  });

  hasError(control: keyof typeof this.myForm.controls, error: string): boolean {
    const formControl = this.myForm.controls[control];
    return formControl?.invalid && (formControl?.touched || formControl?.dirty);
  }
}
