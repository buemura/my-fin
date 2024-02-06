import { PlusCircleIcon } from "lucide-react";

import { Button } from "@/components/ui";
import { useFetchAccounts } from "@/pages/dashboard/hooks";
import { AccountListType } from "@/types";
import { formatBRL } from "@/utils";
import { AccountCard } from "./account-card";
import { AccountNewDialog } from "./account-new-dialog";

interface AccountListProps {
  data: AccountListType | undefined;
}

const AccountList = ({ data }: AccountListProps) => {
  if (!data || !data.data.accounts.length)
    return (
      <AccountNewDialog>
        <Button
          variant="default"
          className="h-28 w-full flex gap-2 border border-dashed border-white text-white bg-emerald-800 hover:bg-emerald-900"
        >
          <PlusCircleIcon />
          New account
        </Button>
      </AccountNewDialog>
    );

  return (
    <>
      {data.data.accounts.map((account) => (
        <AccountCard {...account} />
      ))}
    </>
  );
};

export function Accounts() {
  const { data } = useFetchAccounts();

  return (
    <div className="bg-emerald-700 p-4 lg:p-8 rounded-2xl space-y-5 flex flex-col justify-between h-1/2 lg:w-full lg:h-full">
      <div>
        <span className="text-white">Total Balance</span>
        <h1 className="text-2xl font-bold text-white">
          {formatBRL(data?.data.totalBalance || 0)}
        </h1>
      </div>

      <div className="space-y-2 overflow-scroll lg:overflow-hidden">
        <span className="text-white">My accounts</span>
        <AccountList data={data} />
      </div>
    </div>
  );
}
