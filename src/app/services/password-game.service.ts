import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Rule } from "../models/rule.model";
import { defaultRules } from "../rules/rules";
import { RuleEngine } from "./rule-engine.service";

@Injectable({ providedIn: 'root' })
export class PasswordGameService {
  private rulesSource = new BehaviorSubject<Rule[]>([]);
  private currentLevelSource = new BehaviorSubject<number>(1);
  private passwordSource = new BehaviorSubject<string>('');
  private hasStartedTypingSource = new BehaviorSubject<boolean>(false);

  rules$ = this.rulesSource.asObservable();
  currentLevel$ = this.currentLevelSource.asObservable();
  password$ = this.passwordSource.asObservable();
  hasStartedTyping$ = this.hasStartedTypingSource.asObservable();

  constructor(private ruleEngine: RuleEngine) {
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
    const currentLevel = this.currentLevelSource.value;
    const rules = this.rulesSource.value;

    const { updatedRules, allCurrentLevelRulesValid } = this.ruleEngine.validate(password, rules, currentLevel);

    this.rulesSource.next(updatedRules);

    if (allCurrentLevelRulesValid && currentLevel === this.currentLevelSource.value) {
      this.activateNextLevel(password);
    }
  }

  private activateNextLevel(password: string): void {
    const nextLevel = this.currentLevelSource.value + 1;
    const updatedRules = this.ruleEngine.activateNextLevel(this.rulesSource.value, nextLevel);

    this.currentLevelSource.next(nextLevel);
    this.rulesSource.next(updatedRules);

    this.checkRules(password);
  }

  resetGame(): void {
    this.passwordSource.next('');
    this.hasStartedTypingSource.next(false);
    this.currentLevelSource.next(1);
    this.initializeRules();
  }

  private initializeRules(): void {
    const clonedRules = defaultRules.map(r => ({ ...r }));
    this.rulesSource.next(clonedRules);
  }
}
