import { Component, OnInit } from '@angular/core';
import { PasswordGameService } from '../../../services/password-game.service';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit {
  password = '';

  constructor(private passwordGameService: PasswordGameService) {}

  ngOnInit(): void {
    this.passwordGameService.password$.subscribe(password => {
      this.password = password;
    });
  }

  onPasswordChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.passwordGameService.updatePassword(target.value);
  }

  resetGame(): void {
    this.passwordGameService.resetGame();
  }
}