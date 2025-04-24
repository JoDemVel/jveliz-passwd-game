import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'jveliz-passwd-game',
    pathMatch: 'full'
  },
  {
    path: 'jveliz-passwd-game',
    loadChildren: () => import('./features/password-game/password-game.module').then(m => m.PasswordGameModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }