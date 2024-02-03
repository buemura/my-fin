import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getAccountList } from "@/api/accounts";
import { formatBRL } from "@/utils/format-currency";
import { Layout } from "@/components/layout";
import { CardSkeleton, TableSkeleton } from "@/components/ui/skeleton";
import { AccountNewDialog, AccountsTable } from "@/pages/accounts/components";

export function Accounts() {
  const [queryParam] = useSearchParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () =>
      getAccountList({
        userId: "c3e857a5-f881-4d0e-b85e-7bdb15e6639a",
        page: Number(queryParam.get("page")) ?? 1,
      }),
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="w-full dark:bg-neutral-950 px-8 flex flex-col gap-10">
          <h1 className="dark:text-neutral-100 text-4xl">Accounts</h1>

          <div className="flex flex-col gap-10 sm:flex-row">
            <CardSkeleton />
            <CardSkeleton />
          </div>

          <div className="flex justify-end">
            <AccountNewDialog />
          </div>
          <TableSkeleton rowsCount={5} />
        </div>
      </Layout>
    );
  }

  if (!data || error) {
    return (
      <Layout>
        <div className="h-full flex justify-center items-center dark:bg-neutral-950">
          <span className="dark:text-white text-center">
            Failed to fetch accounts
          </span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="w-full dark:bg-neutral-950 p-8 flex flex-col gap-10">
        <h1 className="dark:text-neutral-100 text-4xl">Accounts</h1>

        <div className="flex flex-col gap-10 sm:flex-row">
          <div className="flex flex-col items-center border border-neutral-300 bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 p-12 rounded-2xl">
            <span className="text-xl">Total Net Worth</span>
            <span className="text-xl">{formatBRL(data.data.totalAmount)}</span>
          </div>

          <div className="flex flex-col items-center p-12 rounded-2xl border border-neutral-300 bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 text-xl">
            <span className="text-xl">This month</span>
            <span className="text-xl">+ R$ 2,000.00</span>
          </div>
        </div>

        <div className="flex justify-end">
          <AccountNewDialog />
        </div>

        <AccountsTable data={data.data} metadata={data.metadata} />
      </main>
    </Layout>
  );
}
