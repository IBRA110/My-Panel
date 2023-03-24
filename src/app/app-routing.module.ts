import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(`./pages/crm/crm.module`).then((m) => m.CrmModule),
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import(`./pages/authentication/authentication.module`).then(
        (m) => m.AuthenticationModule,
      ),
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
