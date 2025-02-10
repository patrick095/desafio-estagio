import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {  FormControl, FormGroup, ReactiveFormsModule,  } from '@angular/forms';
import { NG_VALUE_ACCESSOR} from '@angular/forms';
import { forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-primary-input',
  standalone: true,
  imports: [MatInputModule,ReactiveFormsModule,CommonModule],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PrimaryInputComponent),
        multi: true,
      }
    ],
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.scss'
})
export class PrimaryInputComponent {
  @Input () label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';



  value: string = ''
  onChange = (value: any) => {};
  onTouched = () => {};

  constructor() {
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.onChange(value)
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setValue(value: any): void {
    this.value = value;
    this.onChange(value);
  }
}
