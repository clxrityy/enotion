export type Color =
  | number
  | string
  | [number, number, number]
  | [number, number, number, number]
  | { r: number; g: number; b: number }
  | { red: number; green: number; blue: number };

export interface ColorPalette {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  tertiary: string;
  accent: string;
  border: string;
  highlight: string;
  muted: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}
