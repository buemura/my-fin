import { ArrowLeftIcon, ArrowLeftRightIcon } from "lucide-react";
import Link from "next/link";

import { TransactionService } from "@/api/transaction/api";
import { TransactionForm } from "@/components/feature/transactions/transaction-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await TransactionService.getTransaction(params.id);

  if (!data) {
    return null;
  }

  return (
    <main className="p-4 space-y-4">
      <Link href="/">
        <Button variant="outline">
          <ArrowLeftIcon className="-translate-x-0.5 h-4 w-4" />
          Back
        </Button>
      </Link>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <ArrowLeftRightIcon className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-200 rounded-full p-1" />
          <h1 className="text-2xl">Edit transaction</h1>
        </div>

        <TransactionForm isEdit={true} transaction={data} />
      </Card>
    </main>
  );
}
