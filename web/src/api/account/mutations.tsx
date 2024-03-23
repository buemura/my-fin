"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/store";
import { AccountType } from "@/types";
import {
  ACCOUNT_QUERY_KEY,
  AccountService,
  CreateAccountProps,
  UpdateAccountProps,
} from "./api";

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
