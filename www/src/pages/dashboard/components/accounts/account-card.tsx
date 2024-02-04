import { WalletIcon } from "lucide-react";

import { AccountType } from "@/types";
import { formatBRL, formatDate } from "@/utils";

export function AccountCard(account: AccountType) {
  return (
    <div className="bg-white rounded-xl flex justify-between items-center px-4 py-4">
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
        {formatBRL(account.balance)}
      </span>
    </div>
  );
}
