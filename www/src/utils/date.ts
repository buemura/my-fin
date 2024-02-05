export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("pt-br");
}

export function getMonthFromString(mon: string) {
  return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1;
}
