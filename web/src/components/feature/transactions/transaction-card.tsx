"use client";

import { WalletIcon } from "lucide-react";

import { TransactionType } from "@/types";
import { currencyFormatter, formatDate } from "@/utils";

export function TransactionCard(transaction: TransactionType) {
  const transactionColor =
    transaction.type === "EXPENSE" ? "#bf3939" : "#29a358";
  const transactionSymbol = transaction.type === "INCOME" ? "+ " : "- ";

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl flex justify-between items-center px-4 py-4">
      <div className="flex items-center gap-4">
        <WalletIcon className="p-1 rounded-full w-8 h-8" />

        <div className="flex flex-col">
          <span className="text-zinc-800 dark:text-white text-md">
            {transaction.name}
          </span>
          <span className="text-zinc-950 dark:text-zinc-400 font-semibold text-md">
            {formatDate(transaction.date)}
          </span>
        </div>
      </div>

      <span
        className="text-zinc-950 font-semibold text-md"
        style={{ color: transactionColor }}
      >
        {transactionSymbol}
        {currencyFormatter.format(transaction.amount)}
      </span>
    </div>
  );
}
