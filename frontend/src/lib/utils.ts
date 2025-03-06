import { type ClassValue, clsx } from "clsx";
import { differenceInDays } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(text: string) {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

export function calculateCourseProgress(startDate: Date, endDate: Date) {
  const start = startDate;
  const end = endDate;
  const now = new Date();

  // If the course is in the future, return 0
  if (now < start) return 0;

  // If the course has already ended, return 100
  if (now > end) return 100;

  // Calculate the total number of days
  const totalDays = differenceInDays(end, start);

  // Calculate the number of days that have passed
  const elapsedDays = differenceInDays(now, start);

  // Calculate the percentage of progress
  const progress = (elapsedDays / totalDays) * 100;

  return progress;
}
