import { ArrowLeftIcon, WalletIcon } from "lucide-react";
import Link from "next/link";

import { AccountService } from "@/api/account/api";
import { AccountForm } from "@/components/feature/accounts/account-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await AccountService.getAccount({
    accountId: params.id,
  });

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
          <WalletIcon className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-200 rounded-full p-1" />
          <h1 className="text-2xl">Edit account</h1>
        </div>

        <AccountForm isEdit={true} account={data} />
      </Card>
    </main>
  );
}
