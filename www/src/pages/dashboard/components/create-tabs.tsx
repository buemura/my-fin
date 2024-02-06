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
        child={
          <>
            <div className="space-y-1">
              <Label htmlFor="expense-name">Name</Label>
              <Input id="expense-name" defaultValue="Grocery" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="expense-amount">Amount</Label>
              <Input id="expense-amount" type="number" defaultValue={1} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="expense-account">Account</Label>
              <Input id="expense-account" defaultValue="Nubank" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="expense-date">Date</Label>
              <Input id="expense-date" type="date" />
            </div>
          </>
        }
      />

      <TabContent
        value="income"
        title="Income"
        description="Add an new income."
        icon={
          <TrendingUp className="w-6 h-6 bg-emerald-100 dark:bg-emerald-950 text-emerald-500 dark:text-emerald-200 rounded-full p-1" />
        }
        child={
          <>
            <div className="space-y-1">
              <Label htmlFor="income-name">Name</Label>
              <Input id="income-name" defaultValue="Grocery" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="income-amount">Amount</Label>
              <Input id="income-amount" type="number" defaultValue={1} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="income-account">Account</Label>
              <Input id="income-account" defaultValue="Nubank" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="income-date">Date</Label>
              <Input id="income-date" type="date" />
            </div>
          </>
        }
      />

      <TabContent
        value="account"
        title="Account"
        description="Add an new account."
        icon={
          <Wallet className="w-6 h-6 bg-blue-100 dark:bg-blue-950 text-blue-500 dark:text-blue-200 rounded-full p-1" />
        }
        child={
          <>
            <div className="space-y-1">
              <Label htmlFor="account-name">Name</Label>
              <Input id="account-name" defaultValue="Grocery" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="account-amount">Balance</Label>
              <Input id="account-amount" type="number" defaultValue={1} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="account-color">Color</Label>
              <Input id="account-color" defaultValue="purple" />
            </div>
          </>
        }
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
        <CardFooter>
          <Button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white"
          >
            {/* {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
            Submit
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};
