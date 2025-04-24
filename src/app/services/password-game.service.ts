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

  async updatePassword(password: string): Promise<void> {
    if (password.length > 0 && !this.hasStartedTypingSource.value) {
      this.hasStartedTypingSource.next(true);
    }

    this.passwordSource.next(password);
    await this.checkRules(password);
  }

  private async checkRules(password: string): Promise<void> {
    const currentLevel = this.currentLevelSource.value;
    const rules = this.rulesSource.value;
    const maxLevel = this.getMaxLevel();

    const { updatedRules, allCurrentLevelRulesValid } =
      await this.ruleEngine.validateAsync(password, rules, currentLevel);

    this.rulesSource.next(updatedRules);

    if (allCurrentLevelRulesValid && currentLevel === this.currentLevelSource.value && currentLevel < maxLevel) {
      await this.activateNextLevel(password);
    }
  }

  private getMaxLevel(): number {
    const rules = this.rulesSource.value;
    return Math.max(...rules.map(rule => rule.level));
  }

  private async activateNextLevel(password: string): Promise<void> {
    const nextLevel = this.currentLevelSource.value + 1;
    const updatedRules = this.ruleEngine.activateNextLevel(this.rulesSource.value, nextLevel);

    this.currentLevelSource.next(nextLevel);
    this.rulesSource.next(updatedRules);
    await this.checkRules(password);
  }

  resetGame(): void {
    this.passwordSource.next('');
    this.hasStartedTypingSource.next(false);
    this.currentLevelSource.next(1);
    this.initializeRules();
  }

  private initializeRules(): void {
    const clonedRules = defaultRules.map((r: Rule) => ({ ...r }));

    this.rulesSource.next(clonedRules);
  }
}
