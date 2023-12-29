export function formatBRL(amount: number): string {
  return `R$ ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
