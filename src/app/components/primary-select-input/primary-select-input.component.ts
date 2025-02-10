import { Component,Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-primary-select-input',
  standalone: true,
  imports: [MatSelectModule,CommonModule,ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimarySelectInputComponent),
      multi: true,
    }
  ],
  templateUrl: './primary-select-input.component.html',
  styleUrl: './primary-select-input.component.scss'
})
export class PrimarySelectInputComponent {
  @Input() label: string = '';
  @Input() options: any[] = [];
  @Input() nome : string = '';
  
  
  value: string = ''
  onChange = (value: any) => {};
  onTouched = () => {};

  constructor() {

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

  onSelectChange(event: any) {
    this.value = event.value;
    this.onChange(this.value); 
  }
}
