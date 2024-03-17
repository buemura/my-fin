import { Skeleton } from "@/components/ui/skeleton";
import { TransactionListType } from "@/types";
import { TransactionCard } from "./transaction-card";

interface TransactionListProps {
  transactionList: TransactionListType | undefined;
  loading: boolean;
}

export default function TransactionList({
  transactionList,
  loading,
}: TransactionListProps) {
  if (loading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[80px] rounded-xl" />
        <Skeleton className="h-[80px] rounded-xl" />
      </div>
    );
  }

  return (
    <>
      {transactionList?.data?.map((transaction) => (
        <TransactionCard key={transaction.id} {...transaction} />
      ))}
    </>
  );
}
