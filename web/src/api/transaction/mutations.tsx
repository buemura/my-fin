"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/store";
import { TransactionSchema, TransactionType } from "@/types";
import {
  TRANSACTION_QUERY_KEY,
  TransactionService,
  UpdateTransactionProps,
} from "./api";

export function useMutateTransactionDelete() {
  const { toast } = useToast();
  const queryCache = useQueryClient();

  return useMutation({
    mutationFn: (transaction: TransactionType) =>
      TransactionService.deleteTransactionById(transaction.id),
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
    mutationFn: (input: TransactionSchema) =>
      TransactionService.createTransaction({
        ...input,
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
