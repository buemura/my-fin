import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionTypeEnum } from "@/types";
import { AccountNewForm } from "../accounts/account-new-form";
import { TransactionNewForm } from "../transactions/transaction-new-form";
import { TabContent } from "./resource-tab";

interface CreateResourceTabsProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreateResourceTabs({ setOpen }: CreateResourceTabsProps) {
  return (
    <Tabs defaultValue="expense" className="">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="expense">Expense</TabsTrigger>
        <TabsTrigger value="income">Income</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>

      <TabContent
        value="expense"
        title="Expense"
        description="Add an new expense."
        icon={
          <TrendingDown className="w-6 h-6 bg-red-100 dark:bg-red-950 text-red-500 dark:text-red-200 rounded-full p-1" />
        }
        child={<TransactionNewForm defaultType={TransactionTypeEnum.EXPENSE} />}
      />

      <TabContent
        value="income"
        title="Income"
        description="Add an new income."
        icon={
          <TrendingUp className="w-6 h-6 bg-emerald-100 dark:bg-emerald-950 text-emerald-500 dark:text-emerald-200 rounded-full p-1" />
        }
        child={<TransactionNewForm defaultType={TransactionTypeEnum.INCOME} />}
      />

      <TabContent
        value="account"
        title="Account"
        description="Add an new account."
        icon={
          <Wallet className="w-6 h-6 bg-blue-100 dark:bg-blue-950 text-blue-500 dark:text-blue-200 rounded-full p-1" />
        }
        child={<AccountNewForm setOpen={setOpen} />}
      />
    </Tabs>
  );
}
