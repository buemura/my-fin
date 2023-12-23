import {
  AccountsTable,
  MonthDifference,
  TotalAmount,
} from "@/components/feature/accounts";
import { AccountType } from "@/types/account";
import { PaginationMetadata } from "@/types/pagination-metadata";

export default function Accounts() {
  const accounts: AccountType[] = [
    {
      id: "1",
      name: "Nubank",
      amount: 12000,
      updatedAt: new Date("2023-12-08"),
    },
    {
      id: "2",
      name: "Itau",
      amount: 4000,
      updatedAt: new Date("2023-12-15"),
    },
    {
      id: "3",
      name: "Inter",
      amount: 2000,
      updatedAt: new Date("2023-12-15"),
    },
  ];

  const metadata: PaginationMetadata = {
    items: accounts.length,
    page: 1,
    totalItems: 100,
    totalPages: 5,
  };

  return (
    <div className="w-screen bg-neutral-950 p-10 flex flex-col gap-10">
      <h1 className="text-neutral-100 text-4xl mt-4">Accounts</h1>
      <div className="flex gap-10 mt-10">
        <TotalAmount />
        <MonthDifference />
      </div>

      <AccountsTable data={accounts} metadata={metadata} />
    </div>
  );
}
