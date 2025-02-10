import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
@Component({
  selector: 'app-register-confirmation',
  standalone: true,
  imports: [MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule],
  templateUrl: './register-confirmation.component.html',
  styleUrl: './register-confirmation.component.scss'
})
export class RegisterConfirmationComponent {

}
