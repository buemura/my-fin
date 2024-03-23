"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { AccountService } from "@/api";
import { useAccountStore, useUserStore } from "@/store";

export const useFetchAccounts = () => {
  const { user } = useUserStore();
  const { setAccounts } = useAccountStore();

  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: async () =>
      await AccountService.getAccountList({
        userId: user!.id,
        page: 1,
      }),
  });

  const { data } = query;

  useEffect(() => {
    setAccounts(data?.data.accounts || []);
  }, [query.isSuccess]);

  return query;
};
