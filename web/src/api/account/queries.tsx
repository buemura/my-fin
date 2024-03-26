"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { useAccountStore } from "@/store";
import { ACCOUNT_QUERY_KEY, AccountService } from "./api";

export function useAccountQuery() {
  const { setAccounts } = useAccountStore();

  const query = useQuery({
    queryKey: [ACCOUNT_QUERY_KEY],
    queryFn: async () =>
      await AccountService.getAccountList({
        page: 1,
      }),
  });

  const { data } = query;

  useEffect(() => {
    setAccounts(data?.data.accounts || []);
  }, [query.isSuccess, data?.data.accounts, setAccounts]);

  return query;
}
