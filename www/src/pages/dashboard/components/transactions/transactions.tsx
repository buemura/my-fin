import { FilterIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui";
import { useFetchCategories } from "@/pages/dashboard/hooks";
import { TransactionType, TransactionTypeEnum } from "@/types";
import { getMonthFromString } from "@/utils";
import { MonthFilter } from "./month-filter";
import { TransactionCard } from "./transaction-card";
import { TransactionFilter } from "./transaction-filter";
import { YearFilter } from "./year-filter";

type TrxFilterType = "Transaction" | "Income" | "Expense";

const transactions: TransactionType[] = [
  {
    id: "1234",
    accountId: "1234",
    categoryId: "4321",
    name: "Some expense",
    amount: 1200,
    type: TransactionTypeEnum.EXPENSE,
    date: new Date(),
  },
  {
    id: "1234",
    accountId: "1234",
    categoryId: "4321",
    name: "Dinner",
    amount: 300,
    type: TransactionTypeEnum.EXPENSE,
    date: new Date(),
  },
  {
    id: "1234",
    accountId: "1234",
    categoryId: "4321",
    name: "Salary",
    amount: 4400,
    type: TransactionTypeEnum.INCOME,
    date: new Date(),
  },
];

export function Transactions() {
  const { data } = useFetchCategories();

  const [trxFilter, setTrxFilter] = useState<TrxFilterType>("Transaction");
  const [monthFilter, setMonthFilter] = useState<string>("Jan");
  const [yearFilter, setYearFilter] = useState<number>(
    new Date().getFullYear()
  );

  const params = {
    type: trxFilter,
    month: getMonthFromString(monthFilter),
    year: yearFilter,
  };

  console.log(params);

  return (
    <div className="p-4 lg:p-8 rounded-2xl bg-zinc-100 dark:bg-zinc-900 min-h-1/2 lg:w-full lg:h-full space-y-10">
      <div className="flex flex-col lg:justify-between gap-2 lg:flex-row">
        <div className="flex justify-between">
          <TransactionFilter title={trxFilter} setFilter={setTrxFilter} />
          <MonthFilter title={monthFilter} setFilter={setMonthFilter} />
          <YearFilter title={yearFilter} setFilter={setYearFilter} />
        </div>

        <Button className="text-white bg-emerald-700 hover:bg-emerald-800 flex gap-2">
          <FilterIcon className="w-4" />
          Filter
        </Button>
      </div>

      <div className="space-y-4">
        <span className="text-zinc-900 dark:text-white">My transactions</span>
        <div className="space-y-2">
          {transactions.map((transaction) => (
            <TransactionCard {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
}
