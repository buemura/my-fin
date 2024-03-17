"use client";

import { FilterIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useFetchCategories, useFetchTransactions } from "@/hooks";
import { getMonthFromString } from "@/utils";
import { TransactionMonthFilter } from "./filter-month";
import {
  TransactionFilterType,
  TransactionTypeFilter,
} from "./filter-transaction";
import { TransactionYearFilter } from "./filter-year";
import TransactionList from "./transaction-list";

export function TransactionSection() {
  const { data: trnsactionList, isLoading } = useFetchTransactions();
  useFetchCategories();

  const [trxFilter, setTrxFilter] =
    useState<TransactionFilterType>("Transaction");
  const [monthFilter, setMonthFilter] = useState<string>("Jan");
  const [yearFilter, setYearFilter] = useState<number>(
    new Date().getFullYear()
  );

  const params = {
    type: trxFilter,
    month: getMonthFromString(monthFilter),
    year: yearFilter,
  };

  return (
    <div className="p-4 lg:p-8 rounded-2xl bg-zinc-100 dark:bg-zinc-900 h-full lg:w-full space-y-10">
      <div className="flex flex-col lg:justify-between gap-2 lg:flex-row">
        <div className="flex justify-between">
          <TransactionTypeFilter title={trxFilter} setFilter={setTrxFilter} />
          <TransactionMonthFilter
            title={monthFilter}
            setFilter={setMonthFilter}
          />
          <TransactionYearFilter title={yearFilter} setFilter={setYearFilter} />
        </div>

        <Button className="text-white bg-emerald-700 hover:bg-emerald-800 flex gap-2">
          <FilterIcon className="w-4" />
          Apply Filter
        </Button>
      </div>

      <div className="space-y-2 overflow-scroll lg:overflow-hidden">
        <span className="text-zinc-900 dark:text-white">My transactions</span>
        <TransactionList loading={isLoading} transactionList={trnsactionList} />
      </div>
    </div>
  );
}
