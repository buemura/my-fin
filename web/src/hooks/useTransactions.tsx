"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { TransactionService, UpdateTransactionProps } from "@/api";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/store";
import { CreateTransactionSchema, TransactionType } from "@/types";

const TRANSACTION_QUERY_KEY = "transactins";

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

export function useMutateTransactionDelete() {
  const { user } = useUserStore();
  const { toast } = useToast();
  const queryCache = useQueryClient();

  return useMutation({
    mutationFn: (transaction: TransactionType) =>
      TransactionService.deleteTransactionById(user!.id, transaction.id),
    onSuccess: () => {
      queryCache.invalidateQueries({ queryKey: [TRANSACTION_QUERY_KEY] });
      toast({
        title: "Successfully deleted transaction.",
        className: "bg-emerald-500 text-white",
      });
    },
    onError: () =>
      toast({
        title: "Failed to delete transaction.",
        className: "bg-red-500 text-white",
      }),
  });
}

export function useMutateTransactionCreate() {
  const { user } = useUserStore();
  const { toast } = useToast();
  const queryCache = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTransactionSchema) =>
      TransactionService.createTransaction({
        ...input,
        userId: user!.id,
      }),
    onSuccess: () => {
      queryCache.invalidateQueries({ queryKey: [TRANSACTION_QUERY_KEY] });
      toast({
        title: "Successfully created transaction.",
        className: "bg-emerald-500 text-white",
      });
    },
    onError: () =>
      toast({
        title: "Failed to create transaction.",
        className: "bg-red-500 text-white",
      }),
  });
}

export function useMutateTransactionUpdate() {
  const { toast } = useToast();
  const queryCache = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTransactionProps) =>
      TransactionService.updateTransactionById(data),
    onSuccess: () => {
      queryCache.invalidateQueries({ queryKey: [TRANSACTION_QUERY_KEY] });
      toast({
        title: "Successfully updated transaction.",
        className: "bg-emerald-500 text-white",
      });
    },
    onError: () =>
      toast({
        title: "Failed to update transaction.",
        className: "bg-red-500 text-white",
      }),
  });
}
