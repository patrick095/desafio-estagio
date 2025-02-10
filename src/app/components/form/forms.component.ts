import {
  Component,
  afterNextRender,
  Injector,
  inject,
  OnInit,
  Input,
  input,
  Output,
} from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { PrimaryInputComponent } from '../primary-input/primary-input.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { ViewChild, EventEmitter } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CadastroService } from '../../services/register.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { PrimarySelectInputComponent } from '../primary-select-input/primary-select-input.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Model } from '../../interfaces/model';
import { Brand } from '../../interfaces/brand';
import { Device } from '../../interfaces/device';
import { Cadastro } from '../../interfaces/register';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    SideBarComponent,
    PrimaryInputComponent,
    CommonModule,
    MatRadioModule,
    MatFormFieldModule,
    TextFieldModule,
    MatInputModule,
    CdkTextareaAutosize,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    PrimarySelectInputComponent,
  ],
  providers: [CadastroService],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent implements OnInit {
  marcas: Brand[] = [];
  modelos: Model[] = [];
  dispositivo = input<Device | null>(null);

  cadastroForm!: FormGroup<Cadastro>;

  @Output() save = new EventEmitter<Device>();
  @Input() title: string = '';

  constructor(
    private registerService: CadastroService,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit() {
    this.listaMarcas();
    this.listaModelos(0);

    this.cadastroForm = new FormGroup<Cadastro>({
      id: new FormControl<number | null>(this.dispositivo()?.id ?? null),
      brandId: new FormControl<number | null>(
        this.dispositivo()?.brand.id ?? null,
        [Validators.required]
      ),
      modelId: new FormControl<number | null>(
        this.dispositivo()?.model.id ?? null,
        [Validators.required]
      ),
      processor: new FormControl<string | null>(
        this.dispositivo()?.processor ?? null,
        [Validators.required]
      ),
      memory: new FormControl<string | null>(
        this.dispositivo()?.memory ?? null,
        [Validators.required]
      ),
      screen: new FormControl<string | null>(
        this.dispositivo()?.screen ?? null,
        [Validators.required]
      ),
      storage: new FormControl<string | null>(
        this.dispositivo()?.storage ?? null,
        [Validators.required]
      ),
      newDevice: new FormControl<boolean | null>(
        this.dispositivo()?.newDevice ?? null
      ),
      description: new FormControl<string | null>(
        this.dispositivo()?.description ?? null
      ),
    });

    this.cadastroForm
      .get('brandId')
      ?.valueChanges.subscribe((marcaNome: number | null) => {
        if (marcaNome) {
          this.listaModelos(marcaNome);
        }
      });
  }

  onSubmit() {
    if (this.cadastroForm.invalid) {
      this.snackBar.open('Preencha todos os campos obrigatórios', 'Fechar', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }

    const dispositivo = this.cadastroForm.value as unknown as Device;

    this.save.emit(dispositivo);
  }

  listaMarcas() {
    this.registerService.brandList().subscribe({
      next: (res) => {
        this.marcas = res;
      },
      error: (error) => {
        console.log('Erro ao carregar as marcas', error);
      },
    });
  }

  listaModelos(id: number) {
    this.registerService.modelList(id).subscribe({
      next: (res) => {
        this.modelos = res;
      },
      error: (error) => {
        console.log('Erro ao carregar os modelos', error);
      },
    });
  }

  resetForm() {
    this.cadastroForm.reset({
      id: null,
      brandId: null,
      modelId: null,
      processor: '',
      memory: '',
      screen: '',
      storage: '',
      newDevice: null,
    });
  }
}
