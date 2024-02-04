export function formatBRL(value: number): string {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}
