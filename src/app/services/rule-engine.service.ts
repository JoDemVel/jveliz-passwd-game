import { Injectable } from '@angular/core';
import { Rule } from '../models/rule.model';

@Injectable({ providedIn: 'root' })
export class RuleEngine {
  async validateAsync(password: string, rules: Rule[], currentLevel: number): Promise<{
    updatedRules: Rule[],
    allCurrentLevelRulesValid: boolean
  }> {
    let allCurrentLevelRulesValid = true;

    const updatedRules = await Promise.all(
      rules.map(async rule => {
        if (rule.level <= currentLevel) {
          const isValid = await rule.validator(password);
          if (rule.level === currentLevel && !isValid) {
            allCurrentLevelRulesValid = false;
          }
          return { ...rule };
        }
        return rule;
      })
    );

    return { updatedRules, allCurrentLevelRulesValid };
  }

  activateNextLevel(rules: Rule[], nextLevel: number): Rule[] {
    return rules.map(rule => ({
      ...rule,
      isActive: rule.level === nextLevel ? true : rule.isActive
    }));
  }
}