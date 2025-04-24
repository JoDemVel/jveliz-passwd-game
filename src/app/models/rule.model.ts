export interface Rule {
  id: number;
  level: number;
  description: string;
  validator: (password: string) => boolean;
  isActive: boolean;
  hint?: string;
}