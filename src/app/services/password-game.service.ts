import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Rule } from "../models/rule.model";

@Injectable({
  providedIn: 'root'
})
export class PasswordGameService {
  private rulesSource = new BehaviorSubject<Rule[]>([]);
  private currentLevelSource = new BehaviorSubject<number>(1);
  private passwordSource = new BehaviorSubject<string>('');
  private hasStartedTypingSource = new BehaviorSubject<boolean>(false);

  rules$ = this.rulesSource.asObservable();
  currentLevel$ = this.currentLevelSource.asObservable();
  password$ = this.passwordSource.asObservable();
  hasStartedTyping$ = this.hasStartedTypingSource.asObservable();

  constructor() {
    this.initializeRules();
  }

  updatePassword(password: string): void {
    if (password.length > 0 && !this.hasStartedTypingSource.value) {
      this.hasStartedTypingSource.next(true);
    }

    this.passwordSource.next(password);
    this.checkRules(password);
  }

  private checkRules(password: string): void {
    const rules = this.rulesSource.value;
    const currentLevel = this.currentLevelSource.value;
    let allCurrentLevelRulesValid = true;

    rules.forEach(rule => {
      if (rule.level <= currentLevel) {
        const isValid = rule.validator(password);
        if (rule.level === currentLevel && !isValid) {
          allCurrentLevelRulesValid = false;
        }
      }
    });

    if (allCurrentLevelRulesValid && currentLevel === this.currentLevelSource.value) {
      this.activateNextLevel();
      return this.checkRules(password);
    }

    this.rulesSource.next([...rules]);
  }

  private activateNextLevel(): void {
    const currentLevel = this.currentLevelSource.value;
    const nextLevel = currentLevel + 1;
    const rules = this.rulesSource.value;

    rules.forEach(rule => {
      if (rule.level === nextLevel) {
        rule.isActive = true;
      }
    });

    this.currentLevelSource.next(nextLevel);
    this.rulesSource.next([...rules]);
  }

  resetGame(): void {
    this.passwordSource.next('');
    this.hasStartedTypingSource.next(false);
    this.currentLevelSource.next(1);
    this.initializeRules();
  }

  private initializeRules(): void {
    const rules: Rule[] = [
      {
        id: 1,
        level: 1,
        description: 'Your password must be at least 5 characters long',
        validator: (password: string) => password.length >= 5,
        isActive: true
      },
      {
        id: 2,
        level: 2,
        description: 'Your password must include a number',
        validator: (password: string) => /[0-9]/.test(password),
        isActive: false
      },
      {
        id: 3,
        level: 3,
        description: 'Your password must include an uppercase letter',
        validator: (password: string) => /[A-Z]/.test(password),
        isActive: false
      },
      {
        id: 4,
        level: 4,
        description: 'Your password must include a special character',
        validator: (password: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        isActive: false
      },
      {
        id: 5,
        level: 5,
        description: 'The digits in your password must add up to 69',
        validator: (password: string) => {
          const numbers = password.match(/\d/g);
          if (!numbers) return false;
          return numbers.reduce((sum, digit) => sum + parseInt(digit, 10), 0) === 69;
        },
        isActive: false
      },
      {
        id: 6,
        level: 6,
        description: 'Your password must include the symbol of a chemical element',
        validator: (password: string) => {
          const elements = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'];
          return elements.some(element =>
            new RegExp(`${element}(?![a-z])`, 'g').test(password)
          );
        },
        hint: 'Examples: H (Hydrogen), O (Oxygen), Na (Sodium)',
        isActive: false
      },
      {
        id: 7,
        level: 7,
        description: 'Your password must include a happy emoji',
        validator: (password: string) => {
          const happyEmojis = ['😀', '😃', '😄', '😁', '😆', '😊', '😺'];
          return happyEmojis.some(emoji => password.includes(emoji));
        },
        isActive: false
      },
      {
        id: 8,
        level: 8,
        description: 'Your password must include the current month written in full',
        validator: (password: string) => {
          const months = ['january', 'february', 'march', 'april', 'may', 'june',
                          'july', 'august', 'september', 'october', 'november', 'december'];
          const currentMonth = new Date().getMonth();
          return password.toLowerCase().includes(months[currentMonth]);
        },
        isActive: false
      },
      {
        id: 9,
        level: 9,
        description: 'Your password must include the solution to this equation: 4! - 1',
        validator: (password: string) => password.includes('23'),
        isActive: false
      },
    ];

    this.rulesSource.next(rules);
  }
}