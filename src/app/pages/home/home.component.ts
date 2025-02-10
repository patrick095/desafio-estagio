import { Component, ViewChild } from '@angular/core';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { CardComponent } from '../../components/card/card.component';
import { HomeService } from '../../services/home.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from '../../modal-confirmation/dialog-confirmation/dialog-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Device } from '../../interfaces/device';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { transition, trigger, style, animate,  } from '@angular/animations';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SideBarComponent,
    CardComponent,
    CardComponent,
    CommonModule,
    MatPaginatorModule,
    MatPaginator
  ],
  animations: [
    trigger('listAnimation', [
      transition('void => *', [
        style({
          height:0,
          opacity:0,
          transform:'scale(0.85)',
          'margin-bottom':0,

          paddingTop:0,
          paddingBottom:0,
          paddingLeft:0,
          paddingRight:0,
        }),
        animate('50ms',style({
          height:'*',
          'margin-bottom':'*',
          paddingTop:'*',
          paddingBottom:'*',
          paddingLeft:'*',
          paddingRight:'*',
        })),
        animate(200)
      ]),
      transition('* => void', [
        animate(50, style({
          transform:'scale(1.05)'
        })),
        animate(50, style({
          transform:'scale(1)',
          opacity: 0.75
        })),
        animate('120ms ease-out', style({
          transform:'scale(0.70)',
          opacity: 0
        })),
        animate('200ms ease-out', style({
          height:0,
          opacity:0,
          paddingTop:0,
          paddingBottom:0,
          paddingLeft:0,
          paddingRight:0,
          'margin-bottom':0,
        }))
      ])
    ])
      
  ],
  providers: [HomeService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  dispositivos: Device[] = [];

  currentPage = 0;
  pageSize = 6;
  length = 0;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private homeService: HomeService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.deviceList();
  }

  deviceList(page: PageEvent = { pageIndex: 0, pageSize: 6, length: 0 }) {
    this.homeService.deviceList(page.pageIndex, page.pageSize).subscribe({
      next: (res) => {
        this.currentPage = page.pageIndex;
        this.pageSize = page.pageSize;
        this.dispositivos = res;
      },
      error: (error) => {
        console.log('Erro ao carregar os dispositivos', error);
      },
    });
    this.length = this.dispositivos.length;
  }

  onDelete(dispositvo: Device) {
    this.matDialog
      .open(DialogConfirmationComponent)
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this.homeService.deleteDevice(dispositvo.id).subscribe({
            next: () => {
              this.dispositivos = this.dispositivos.filter(
                d => d.id !== dispositvo.id
              )

              this.snackBar.open('Dispositivo deletado com sucesso', 'Fechar', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
              this.deviceList();
            },
            error: (error) => {
              console.log('Erro ao deletar o dispositivo', error);
            },
          });
        }
      });
  }
  onEdit(dispositivo: Device) {
    this.router.navigate(['/editar', dispositivo.id]);
  }
}
