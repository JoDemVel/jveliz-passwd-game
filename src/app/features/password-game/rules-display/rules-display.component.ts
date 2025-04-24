import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rule } from '../../../models/rule.model';
import { PasswordGameService } from '../../../services/password-game.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-rules-display',
  templateUrl: './rules-display.component.html',
  styleUrls: ['./rules-display.component.scss']
})
export class RulesDisplayComponent implements OnInit {
  rules$!: Observable<Rule[]>;
  password$!: Observable<string>;
  currentLevel$!: Observable<number>;
  hasStartedTyping$!: Observable<boolean>;
  orderedRules$!: Observable<Rule[]>;

  constructor(private passwordGameService: PasswordGameService) { }

  ngOnInit(): void {
    this.rules$ = this.passwordGameService.rules$;
    this.password$ = this.passwordGameService.password$;
    this.currentLevel$ = this.passwordGameService.currentLevel$;
    this.hasStartedTyping$ = this.passwordGameService.hasStartedTyping$;

    this.orderedRules$ = combineLatest([
      this.rules$,
      this.password$,
      this.currentLevel$
    ]).pipe(
      map(([rules, password, currentLevel]) => {
        const visibleRules = rules.filter(rule => rule.level <= currentLevel);

        const evaluatedRules = visibleRules.map(rule => ({
          ...rule,
          isValidRule: rule.isActive && rule.validator(password)
        }));

        return evaluatedRules.sort((a, b) => {
          if (a.isValidRule !== b.isValidRule) {
            return a.isValidRule ? 1 : -1;
          }
          return b.level - a.level;
        });
      })
    );
  }

  isRuleVisible(rule: Rule, currentLevel: number): boolean {
    return rule.level <= currentLevel;
  }

  isRuleValid(rule: Rule, password: string): boolean {
    if (!rule.isActive) return false;
    return rule.validator(password);
  }

  trackByRule(index: number, rule: Rule) {
    return rule.id;
  }
}