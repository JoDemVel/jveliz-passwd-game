import { Rule } from '../models/rule.model';
import {
  hasMinLength,
  hasNumber,
  hasUppercase,
  hasSpecialChar,
  numbersSum69,
  includesChemicalElement,
  hasHappyEmoji,
  includesCurrentMonth,
  includesSolutionToEquation,
} from './rules.validator';

export const defaultRules: Rule[] = [
  {
    id: 1,
    level: 1,
    description: 'Your password must be at least 5 characters long',
    validator: hasMinLength,
    isActive: true,
  },
  {
    id: 2,
    level: 2,
    description: 'Your password must include a number',
    validator: hasNumber,
    isActive: false,
  },
  {
    id: 3,
    level: 3,
    description: 'Your password must include an uppercase letter',
    validator: hasUppercase,
    isActive: false,
  },
  {
    id: 4,
    level: 4,
    description: 'Your password must include a special character',
    validator: hasSpecialChar,
    isActive: false,
  },
  {
    id: 5,
    level: 5,
    description: 'The digits in your password must add up to 69',
    validator: numbersSum69,
    isActive: false,
  },
  {
    id: 6,
    level: 6,
    description: 'Your password must include the symbol of a chemical element',
    validator: includesChemicalElement,
    hint: 'Examples: H (Hydrogen), O (Oxygen), Na (Sodium)',
    isActive: false,
  },
  {
    id: 7,
    level: 7,
    description: 'Your password must include a happy emoji',
    validator: hasHappyEmoji,
    isActive: false,
  },
  {
    id: 8,
    level: 8,
    description: 'Your password must include the current month written in full',
    validator: includesCurrentMonth,
    isActive: false,
  },
  {
    id: 9,
    level: 9,
    description:
      'Your password must include the solution to this equation: 4! - 1',
    validator: includesSolutionToEquation,
    isActive: false,
  },
];
