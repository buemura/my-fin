import { FaPlus } from "react-icons/fa";

import { getAccountList } from "@/api/accounts";
import {
  AccountsTable,
  MonthDifference,
  TotalAmount,
} from "@/components/feature/accounts";
import { CardSkeleton, TableSkeleton } from "@/components/ui/skeleton";
import { AccountsType } from "@/types/account";
import { PaginationMetadata } from "@/types/pagination-metadata";

export default async function Accounts() {
  const accountList = await getAccountList();

  if (!accountList) {
    return (
      <div className="h-full flex justify-center items-center">
        <span className="text-white text-center">Failed to fetch accounts</span>
      </div>
    );
  }

  return (
    <main className="w-full bg-neutral-950 px-8 flex flex-col gap-10">
      <h1 className="text-neutral-100 text-4xl">Accounts</h1>

      {/* <Show when={accountList.loading}>
        <div className="flex flex-col gap-10 sm:flex-row">
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className="flex justify-end">
          <a
            href="/accounts/new"
            className="max-w-max px-4 py-2 text-white text-sm bg-blue-700 rounded-lg flex gap-1 items-center"
          >
            <FaSolidPlus />
            New Account
          </a>
        </div>
        <TableSkeleton rowsCount={5} />
      </Show> */}

      <div className="flex flex-col gap-10 sm:flex-row">
        <TotalAmount total={accountList.data.totalAmount} />
        <MonthDifference />
      </div>

      <div className="flex justify-end">
        <a
          href="/accounts/new"
          className="max-w-max px-4 py-2 text-white text-sm bg-blue-700 rounded-lg flex gap-1 items-center"
        >
          <FaPlus />
          New Account
        </a>
      </div>

      <AccountsTable data={accountList.data} metadata={accountList.metadata} />
    </main>
  );
}
