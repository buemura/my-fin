import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";

import { getAccountList } from "@/api/accounts";
import {
  AccountsTable,
  MonthDifference,
  TotalAmount,
} from "@/components/feature/accounts";
import { Layout } from "@/components/layout";
import { CardSkeleton, TableSkeleton } from "@/components/ui/skeleton";

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
        <div className="w-full bg-neutral-950 px-8 flex flex-col gap-10">
          <h1 className="text-neutral-100 text-4xl">Accounts</h1>

          <div className="flex flex-col gap-10 sm:flex-row">
            <CardSkeleton />
            <CardSkeleton />
          </div>

          <div className="flex justify-end">
            <NewAccountButton />
          </div>
          <TableSkeleton rowsCount={5} />
        </div>
      </Layout>
    );
  }

  if (!data || error) {
    return (
      <Layout>
        <div className="h-full flex justify-center items-center">
          <span className="text-white text-center">
            Failed to fetch accounts
          </span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="w-full bg-neutral-950 p-8 flex flex-col gap-10">
        <h1 className="text-neutral-100 text-4xl">Accounts</h1>

        <div className="flex flex-col gap-10 sm:flex-row">
          <TotalAmount total={data.data.totalAmount} />
          <MonthDifference />
        </div>

        <div className="flex justify-end">
          <NewAccountButton />
        </div>

        <AccountsTable data={data.data} metadata={data.metadata} />
      </main>
    </Layout>
  );
}

const NewAccountButton = () => {
  return (
    <Link
      to="/accounts/new"
      className="max-w-max px-4 py-2 text-white text-sm bg-blue-700 rounded-lg flex gap-1 items-center"
    >
      <FaPlus />
      New Account
    </Link>
  );
};
