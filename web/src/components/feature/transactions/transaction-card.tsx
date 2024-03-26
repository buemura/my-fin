import { BanknoteIcon } from "lucide-react";
import Link from "next/link";

import { TransactionType } from "@/types";
import { currencyFormatter, formatDate } from "@/utils";

export function TransactionCard(t: TransactionType) {
  const transactionColor = t.type === "EXPENSE" ? "#bf3939" : "#29a358";
  const transactionSymbol = t.type === "INCOME" ? "+ " : "- ";

  return (
    <Link
      href={`/transaction/${t.id}`}
      className="bg-white dark:bg-zinc-800 rounded-xl flex justify-between items-center px-4 py-4 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <BanknoteIcon className="p-1 rounded-full w-8 h-8" />

        <div className="flex flex-col">
          <span className="text-zinc-800 dark:text-white text-md">
            {t.name}
          </span>
          <span className="text-zinc-950 dark:text-zinc-400 font-semibold text-md">
            {formatDate(t.date)}
          </span>
        </div>
      </div>

      <span
        className="text-zinc-950 font-semibold text-md"
        style={{ color: transactionColor }}
      >
        {transactionSymbol}
        {currencyFormatter.format(t.amount / 100)}
      </span>
    </Link>
  );
}
