import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { PasswordGameComponent } from './password-game.component';
import { PasswordInputComponent } from './password-input/password-input.component';
import { RulesDisplayComponent } from './rules-display/rules-display.component';

const routes: Routes = [
  { path: '', component: PasswordGameComponent }
];

@NgModule({
  declarations: [
    PasswordGameComponent,
    PasswordInputComponent,
    RulesDisplayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    PasswordGameComponent
  ]
})
export class PasswordGameModule { }