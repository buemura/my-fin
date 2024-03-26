import { WalletIcon } from "lucide-react";
import Link from "next/link";

import { AccountType } from "@/types";
import { currencyFormatter, formatDate } from "@/utils";

export function AccountCard(account: AccountType) {
  return (
    <Link
      href={`/account/${account.id}`}
      className="bg-white rounded-xl flex justify-between items-center px-4 py-4 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <WalletIcon
          className="p-1 rounded-full w-8 h-8"
          style={{ color: account.color }}
        />

        <div className="flex flex-col">
          <span className="text-zinc-800 text-md">{account.name}</span>
          <span className="text-zinc-950 font-semibold text-md">
            {formatDate(account.updatedAt)}
          </span>
        </div>
      </div>

      <span className="text-zinc-950 font-semibold text-md">
        {currencyFormatter.format(account.balance)}
      </span>
    </Link>
  );
}
