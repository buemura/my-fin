import {
  AccountsTable,
  MonthDifference,
  TotalAmount,
} from "@/components/feature/accounts";
import { Sidebar } from "@/components/side-bar";
import { AccountListType } from "@/types/account";

export function Accounts() {
  const accountList: AccountListType = {
    data: {
      accounts: [
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
      ],
      totalAmount: 18000,
    },
    metadata: {
      page: 1,
      items: 3,
      totalPages: 1,
      totalItems: 3,
    },
  };

  return (
    <div class="flex">
      <Sidebar />
      <main class="h-screen w-screen bg-neutral-950 p-10 flex flex-col gap-10">
        <h1 class="text-neutral-100 text-4xl mt-4">Accounts</h1>
        <div class="flex flex-col gap-10 mt-10 sm:flex-row">
          <TotalAmount total={accountList.data.totalAmount} />
          <MonthDifference />
        </div>

        <AccountsTable
          data={accountList.data}
          metadata={accountList.metadata}
        />
      </main>
    </div>
  );
}
