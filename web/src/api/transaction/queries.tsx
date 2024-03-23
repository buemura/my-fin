"use client";

import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "@/store";
import { TRANSACTION_QUERY_KEY, TransactionService } from "./api";

export function useTransactionQuery() {
  const { user } = useUserStore();

  return useQuery({
    queryKey: [TRANSACTION_QUERY_KEY],
    queryFn: async () =>
      await TransactionService.getTransactoinList({
        userId: user!.id,
        page: 1,
      }),
  });
}
