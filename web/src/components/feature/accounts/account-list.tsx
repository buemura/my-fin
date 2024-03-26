import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AccountListType } from "@/types";
import { AccountCard } from "./account-card";

interface AccountListProps {
  data: AccountListType | undefined;
  loading: boolean;
}

export default function AccountList({ data, loading }: AccountListProps) {
  if (loading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[80px] rounded-xl" />
        <Skeleton className="h-[80px] rounded-xl" />
      </div>
    );
  }

  if (!data || !data.data.accounts.length)
    return (
      <Link href="/account/new">
        <Button
          variant="default"
          className="h-28 w-full flex gap-2 border border-dashed border-white text-white bg-emerald-800 hover:bg-emerald-900"
        >
          <PlusCircleIcon />
          New account
        </Button>
      </Link>
    );

  return (
    <>
      {data.data.accounts.map((account) => (
        <AccountCard key={account.id} {...account} />
      ))}
    </>
  );
}
