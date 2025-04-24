import { Injectable } from '@angular/core';
import { Rule } from '../models/rule.model';

@Injectable({ providedIn: 'root' })
export class RuleEngine {
  validate(password: string, rules: Rule[], currentLevel: number): {
    updatedRules: Rule[],
    allCurrentLevelRulesValid: boolean
  } {
    let allCurrentLevelRulesValid = true;
    const updatedRules = rules.map(rule => {
      if (rule.level <= currentLevel) {
        const isValid = rule.validator(password);
        if (rule.level === currentLevel && !isValid) {
          allCurrentLevelRulesValid = false;
        }
        return { ...rule };
      }
      return rule;
    });

    return { updatedRules, allCurrentLevelRulesValid };
  }

  activateNextLevel(rules: Rule[], nextLevel: number): Rule[] {
    return rules.map(rule => ({
      ...rule,
      isActive: rule.level === nextLevel ? true : rule.isActive
    }));
  }
}