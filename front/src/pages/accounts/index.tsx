import { Show, createResource } from "solid-js";

import { getAccountList } from "@/api/accounts";
import {
  AccountsTable,
  MonthDifference,
  TotalAmount,
} from "@/components/feature/accounts";
import { Sidebar } from "@/components/side-bar";
import { AccountsType } from "@/types/account";
import { PaginationMetadata } from "@/types/pagination-metadata";

export function Accounts() {
  const [accountList] = createResource(getAccountList);

  return (
    <div class="flex">
      <Sidebar />
      <main class="h-screen w-screen bg-neutral-950 p-10 flex flex-col gap-10">
        <h1 class="text-neutral-100 text-4xl mt-4">Accounts</h1>

        <Show when={accountList.loading}>
          <span class="text-white">Loading...</span>
        </Show>

        <Show
          when={!accountList.loading && (!accountList() || accountList.error)}
        >
          <span class="text-white">Failed to fetch accounts</span>
        </Show>

        <Show when={accountList()}>
          <div class="flex flex-col gap-10 mt-10 sm:flex-row">
            <TotalAmount total={accountList()?.data.totalAmount || 0} />
            <MonthDifference />
          </div>
          <AccountsTable
            data={accountList()?.data as AccountsType}
            metadata={accountList()?.metadata as PaginationMetadata}
          />
        </Show>
      </main>
    </div>
  );
}
