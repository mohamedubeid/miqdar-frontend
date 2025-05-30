import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertValue(value: number, unit: string) {
  switch (unit) {
    case 'mm':
      return value;
    case 'cm':
      return value / 10;
    case 'in':
      return value / 25.4;
    case 'px':
      // Assume 1 inch = 96px, so 1mm = 96/25.4 px
      return value * (96 / 25.4);
    default:
      return value;
  }
}