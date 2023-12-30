import { FaSolidPlus } from "solid-icons/fa";
import { Show, createResource } from "solid-js";

import { getAccountList } from "@/api/accounts";
import {
  AccountsTable,
  MonthDifference,
  TotalAmount,
} from "@/components/feature/accounts";
import { Layout } from "@/components/layout";
import { CardSkeleton, TableSkeleton } from "@/components/ui/skeleton";
import { AccountsType } from "@/types/account";
import { PaginationMetadata } from "@/types/pagination-metadata";

export function Accounts() {
  const [accountList] = createResource(getAccountList);

  return (
    <Layout>
      <main class="w-full bg-neutral-950 px-8 flex flex-col gap-10">
        <h1 class="text-neutral-100 text-4xl">Accounts</h1>

        <Show when={accountList.loading}>
          <div class="flex flex-col gap-10 sm:flex-row">
            <CardSkeleton />
            <CardSkeleton />
          </div>
          <div class="flex justify-end">
            <a
              href="/accounts/new"
              class="max-w-max px-4 py-2 text-white text-sm bg-blue-700 rounded-lg flex gap-1 items-center"
            >
              <FaSolidPlus />
              New Account
            </a>
          </div>
          <TableSkeleton rowsCount={5} />
        </Show>

        <Show
          when={!accountList.loading && (!accountList() || accountList.error)}
        >
          <div class="h-full flex justify-center items-center">
            <span class="text-white text-center">Failed to fetch accounts</span>
          </div>
        </Show>

        <Show when={accountList()}>
          <div class="flex flex-col gap-10 sm:flex-row">
            <TotalAmount total={accountList()?.data.totalAmount || 0} />
            <MonthDifference />
          </div>

          <div class="flex justify-end">
            <a
              href="/accounts/new"
              class="max-w-max px-4 py-2 text-white text-sm bg-blue-700 rounded-lg flex gap-1 items-center"
            >
              <FaSolidPlus />
              New Account
            </a>
          </div>

          <AccountsTable
            data={accountList()?.data as AccountsType}
            metadata={accountList()?.metadata as PaginationMetadata}
          />
        </Show>
      </main>
    </Layout>
  );
}
