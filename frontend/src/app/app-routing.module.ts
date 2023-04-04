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
    path: 'admin',
    loadChildren: () =>
      import(`./pages/admin/admin.module`).then((m) => m.AdminModule),
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
