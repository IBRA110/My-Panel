import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(`./pages/authentication/authentication.module`).then(
        (m) => m.AuthenticationModule,
      ),
  },
  {
    path: 'crm',
    loadChildren: () =>
      import(`./pages/crm/crm.module`).then((m) => m.CrmModule),
    canActivate: [AuthenticationGuard],
    canLoad: [AuthenticationGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import(`./pages/authentication/authentication.module`).then(
        (m) => m.AuthenticationModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
