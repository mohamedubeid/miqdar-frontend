import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { MEASURE_UNITS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertValue(
  value: number,
  currentUnit: MEASURE_UNITS,
  targetUnit: MEASURE_UNITS
): number {
  let valueInMm: number;
  switch (currentUnit) {
    case 'mm':
      valueInMm = value;
      break;
    case 'cm':
      valueInMm = value * 10;
      break;
    case 'in':
      valueInMm = value * 25.4;
      break;
    case 'px':
      valueInMm = value * (25.4 / 96);
      break;
    default:
      valueInMm = value;
  }
  switch (targetUnit) {
    case 'mm':
      return valueInMm;
    case 'cm':
      return valueInMm / 10;
    case 'in':
      return valueInMm / 25.4;
    case 'px':
      return valueInMm * (96 / 25.4);
    default:
      return valueInMm;
  }
}

export function normalizeParam(param?: string | string[]): string | undefined {
  if (!param) return undefined;
  return Array.isArray(param) ? param[0] : param;
}
