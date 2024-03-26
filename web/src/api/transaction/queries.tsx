"use client";

import { useQuery } from "@tanstack/react-query";

import { TRANSACTION_QUERY_KEY, TransactionService } from "./api";

export function useTransactionQuery() {
  return useQuery({
    queryKey: [TRANSACTION_QUERY_KEY],
    queryFn: async () =>
      await TransactionService.getTransactionList({
        page: 1,
      }),
  });
}
