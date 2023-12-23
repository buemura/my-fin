import {
  AccountsTable,
  MonthDifference,
  TotalAmount,
} from "@/components/feature/accounts";
import { AccountListType } from "@/types/account";

export default function Accounts() {
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
      totalPages: 5,
      totalItems: 100,
    },
  };

  return (
    <div className="w-screen bg-neutral-950 p-10 flex flex-col gap-10">
      <h1 className="text-neutral-100 text-4xl mt-4">Accounts</h1>
      <div className="flex gap-10 mt-10">
        <TotalAmount total={accountList.data.totalAmount} />
        <MonthDifference />
      </div>

      <AccountsTable data={accountList.data} metadata={accountList.metadata} />
    </div>
  );
}
