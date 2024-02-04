import { AccountType } from "@/types";
import { formatBRL } from "@/utils";
import { AccountCard } from "./account-card";

const accounts: AccountType[] = [
  {
    id: "1234",
    name: "Inter",
    balance: 1200,
    color: "orange",
    updatedAt: new Date(),
  },
  {
    id: "1234",
    name: "Nubank",
    balance: 4000,
    color: "purple",
    updatedAt: new Date(),
  },
  {
    id: "1234",
    name: "Nubank",
    balance: 4000,
    color: "blue",
    updatedAt: new Date(),
  },
];

export function Accounts() {
  return (
    <div className="bg-emerald-700 p-4 lg:p-8 rounded-2xl space-y-5 flex flex-col justify-between h-1/2 lg:w-full lg:h-full">
      <div>
        <span className="text-white">Total Balance</span>
        <h1 className="text-2xl font-bold text-white">{formatBRL(10030)}</h1>
      </div>

      {/* <div className="space-y-2 overflow-scroll"> */}
      <div className="space-y-2">
        <span className="text-white">My accounts</span>
        {accounts.map((account) => (
          <AccountCard {...account} />
        ))}
      </div>
    </div>
  );
}
