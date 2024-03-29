"use client";

import { useAccountQuery } from "@/api/account/queries";
import { currencyFormatter } from "@/utils";
import AccountList from "./account-list";

export function AccountSection() {
  const { data, isLoading } = useAccountQuery();

  return (
    <div className="bg-emerald-700 p-4 lg:p-8 rounded-2xl space-y-5 flex flex-col justify-between h-1/2 lg:w-full lg:h-full">
      <div>
        <span className="text-white">Total Balance</span>
        <h1 className="text-2xl font-bold text-white">
          {currencyFormatter.format(data?.data.totalBalance || 0)}
        </h1>
      </div>

      <div className="space-y-2 overflow-scroll lg:overflow-hidden">
        <span className="text-white">My accounts</span>
        <AccountList data={data} loading={isLoading} />
      </div>
    </div>
  );
}
