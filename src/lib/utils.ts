import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function calculateBED(
  fractions: number,
  totalDose: number,
  alphaBetha: number
): number {
  const dosePerFraction = totalDose / fractions;
  return totalDose * (1 + dosePerFraction / alphaBetha);
}

export function calculateEQD2(
  fractions: number,
  totalDose: number,
  alphaBetha: number
): number {
  const bed = calculateBED(fractions, totalDose, alphaBetha);
  return bed / (1 + 2 / alphaBetha);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}
