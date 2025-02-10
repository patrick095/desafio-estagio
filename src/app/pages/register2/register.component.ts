import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CadastroService } from '../../services/register.service';
import { Device } from '../../interfaces/device';
import { MatDialog } from '@angular/material/dialog';
import { RegisterConfirmationComponent } from '../../modal-confirmation/register-confirmation/register-confirmation.component';
import { FormsComponent } from '../../components/form/forms.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  

  @ViewChild(FormsComponent) formComponent!: FormsComponent;

  constructor(private cadastroService: CadastroService, private snackBar: MatSnackBar,private matDialog: MatDialog) {}


  onSubmit(dispositivo:Device) {
    this.cadastroService.deviceRegister(dispositivo).subscribe({
      next: (res) => {
        this.matDialog.open(RegisterConfirmationComponent, {
          disableClose: true,  
        })
        this.resetForm();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Erro ao salvar o usuário!', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        
      },
    });
  }

  resetForm(){
    if(this.formComponent){
      this.formComponent.resetForm();
    }
  }
}
