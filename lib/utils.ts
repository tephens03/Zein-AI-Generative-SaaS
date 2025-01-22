import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getAbsoluteUrl(path: string) {
  return `${process.env.NEXT_PUPLIC_APP_URL + path}`
}