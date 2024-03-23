"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { useAccountStore, useUserStore } from "@/store";
import { ACCOUNT_QUERY_KEY, AccountService } from "./api";

export function useAccountQuery() {
  const { user } = useUserStore();
  const { setAccounts } = useAccountStore();

  const query = useQuery({
    queryKey: [ACCOUNT_QUERY_KEY],
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
}
