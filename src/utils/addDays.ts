export const addDays = (date: Date, daysToAdd: number) =>
  new Date(date.setDate(date.getDate() + daysToAdd));
