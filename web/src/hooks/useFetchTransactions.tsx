"use client";

import { useQuery } from "@tanstack/react-query";

import { TransactoinService } from "@/api";
import { useUserStore } from "@/store";

export const useFetchTransactions = () => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () =>
      TransactoinService.getTransactoinList({
        accessToken: user?.accessToken || "",
        userId: user?.user.id || "",
        page: 1,
      }),
  });
};
