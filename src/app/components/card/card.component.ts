import { Component, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';




@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() model: string = '';
  @Input() brand: string = '';
  @Input() memory: string = '';
  @Input() storage: string = '';
  @Input() screen: string = '';
  @Input() processor: string = '';
  @Input() description: string = '';
  @Input() newDevice: boolean = false;

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor() {}


  onEdit(){
    this.edit.emit();
  }

  onDelete(){ 
    this.delete.emit();
  }
}
