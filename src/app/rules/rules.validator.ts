export function hasMinLength(password: string): boolean {
  return password.length >= 5;
}

export function hasNumber(password: string): boolean {
  return /[0-9]/.test(password);
}

export function hasUppercase(password: string): boolean {
  return /[A-Z]/.test(password);
}

export function hasSpecialChar(password: string): boolean {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
}

export function numbersSum69(password: string): boolean {
  const numbers = password.match(/\d/g);
  return numbers ? numbers.reduce((sum, d) => sum + +d, 0) === 25 : false;
}

export function includesChemicalElement(password: string): boolean {
  const elements = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'];
  return elements.some(e => new RegExp(`${e}(?![a-z])`, 'g').test(password));
}

export function hasHappyEmoji(password: string): boolean {
  const happyEmojis = ['😀', '😃', '😄', '😁', '😆', '😊', '😺'];
  return happyEmojis.some(emoji => password.includes(emoji));
}

export function includesCurrentMonth(password: string): boolean {
  const months = ['january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'];
  return password.toLowerCase().includes(months[new Date().getMonth()]);
}

export function includesSolutionToEquation(password: string): boolean {
  return password.includes('23');
}

export function includesGithubUsername(password: string): boolean {
  return /JoDemVel/i.test(password);
}
