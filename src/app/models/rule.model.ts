export interface Rule {
  id: number;
  level: number;
  description: string;
  validator: (password: string) => boolean | Promise<boolean>;
  isActive: boolean;
  hint?: string;
}