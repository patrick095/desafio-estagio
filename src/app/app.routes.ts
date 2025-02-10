import { ActivatedRouteSnapshot, Routes, RouterStateSnapshot } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { inject } from '@angular/core';
import { CadastroService } from './services/register.service';
import { RegisterComponent } from './pages/register2/register.component';



export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'cadastrar', component: RegisterComponent},
    {path: 'editar/:id', 
        resolve: {
            dispositivo: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
                const dispositivoService = inject(CadastroService);

                const id = route.paramMap.get('id');

                return dispositivoService.deviceListId(+id!);
            },
        },
        loadComponent: () =>
            import('./pages/edit/edit.component').then((m) => m.EditComponent),
    },
];
