export const MONTHS = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
} as const;

export type MonthMap = typeof MONTHS;
export type MonthName = keyof typeof MONTHS;
export type MonthNumber = (typeof MONTHS)[MonthName];
