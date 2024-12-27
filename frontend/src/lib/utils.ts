import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseDates<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map((item) => parseDates(item)) as T;
  }

  if (data !== null && typeof data === "object") {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (
          (key === "createdAt" || key === "updatedAt") &&
          typeof value === "string"
        ) {
          return [key, new Date(value)];
        }
        return [key, parseDates(value)];
      }),
    ) as T;
  }

  return data;
}
