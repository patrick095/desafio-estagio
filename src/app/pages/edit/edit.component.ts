import { Component } from '@angular/core';
import { Device} from '../../interfaces/device';
import { ActivatedRoute, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CadastroService } from '../../services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsComponent } from '../../components/form/forms.component';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    FormsComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {

  dispositivo: Device =
    inject(ActivatedRoute).snapshot.data['dispositivo'];

  constructor(
    private cadastroService: CadastroService,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}

  onSubmit(dispositivo: Device) {
      this.cadastroService
        .deviceUpdate(dispositivo)
        .subscribe(() => {
          this.snackBar.open('Dispositivo atualizado com sucesso', 'Fechar', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          
          this.route.navigate(['']);
        });
    }
  }

