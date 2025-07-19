import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatString(string: string) {
  return string.replace(/[^\S\r\n]+/g, " ").trim();
}
