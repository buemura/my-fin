import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccountNewForm } from "@/pages/dashboard/components/accounts/account-new-form";
import { TransactionNewForm } from "@/pages/dashboard/components/transactions/transaction-new-form";
import { TransactionTypeEnum } from "@/types";

export function TabsDemo() {
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
        child={<AccountNewForm />}
      />
    </Tabs>
  );
}

interface TabContentProps {
  value: string;
  title: string;
  description: string;
  child: React.ReactNode;
  icon: React.ReactNode;
}

const TabContent = ({
  value,
  title,
  description,
  child,
  icon,
}: TabContentProps) => {
  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-3">
            {title}
            {icon}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">{child}</CardContent>
      </Card>
    </TabsContent>
  );
};
