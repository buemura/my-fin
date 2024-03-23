"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { AccountService, CreateAccountProps, UpdateAccountProps } from "@/api";
import { useToast } from "@/components/ui/use-toast";
import { useAccountStore, useUserStore } from "@/store";
import { AccountType } from "@/types";

const ACCOUNT_QUERY_KEY = "accounts";

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

export function useMutateAccountCreate() {
  const { toast } = useToast();
  const queryCache = useQueryClient();

  return useMutation({
    mutationFn: (account: CreateAccountProps) =>
      AccountService.createAccount(account),
    onSuccess: () => {
      queryCache.invalidateQueries({ queryKey: [ACCOUNT_QUERY_KEY] });
      toast({
        title: "Successfully created account.",
        className: "bg-emerald-600 text-white",
      });
    },
    onError: () =>
      toast({
        title: "Failed to create account.",
        className: "bg-red-600 text-white",
      }),
  });
}

export function useMutateAccountUpdate() {
  const { toast } = useToast();
  const queryCache = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAccountProps) =>
      AccountService.updateAccountById(data),
    onSuccess: () => {
      queryCache.invalidateQueries({ queryKey: [ACCOUNT_QUERY_KEY] });
      toast({
        title: "Successfully updated account.",
        className: "bg-emerald-600 text-white",
      });
    },
    onError: () =>
      toast({
        title: "Failed to update account.",
        className: "bg-red-600 text-white",
      }),
  });
}

export function useMutateAccountDelete() {
  const { user } = useUserStore();
  const { toast } = useToast();
  const queryCache = useQueryClient();

  return useMutation({
    mutationFn: (account: AccountType) =>
      AccountService.deleteAccountById(user?.id || account.userId, account.id),
    onSuccess: () => {
      queryCache.invalidateQueries({ queryKey: [ACCOUNT_QUERY_KEY] });
      toast({
        title: "Successfully deleted account.",
        className: "bg-emerald-600 text-white",
      });
    },
    onError: () =>
      toast({
        title: "Failed to delete account.",
        className: "bg-red-600 text-white",
      }),
  });
}
