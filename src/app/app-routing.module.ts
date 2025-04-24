import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'jveliz-password-game',
    pathMatch: 'full'
  },
  {
    path: 'jveliz-password-game',
    loadChildren: () => import('./features/password-game/password-game.module').then(m => m.PasswordGameModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }