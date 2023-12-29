import { formatBRL } from "@/utils/currency";

interface TotalAmountProps {
  total: number;
}

export const TotalAmount = ({ total }: TotalAmountProps) => {
  return (
    <div class="flex flex-col items-center border-2 border-neutral-800 bg-neutral-900 text-neutral-100 p-12 rounded-2xl">
      <span class="text-xl">Total Net Worth</span>
      <span class="text-xl">{formatBRL(total)}</span>
    </div>
  );
};
