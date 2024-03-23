"use client";

import { useQuery } from "@tanstack/react-query";

import { TransactionService } from "@/api";
import { useUserStore } from "@/store";

export const useFetchTransactions = () => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () =>
      await TransactionService.getTransactoinList({
        userId: user!.id,
        page: 1,
      }),
  });
};
