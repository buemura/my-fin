"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2Icon } from "lucide-react";
import { useState } from "react";

import { TransactionService } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/store";
import { TransactionType } from "@/types";

export function TransactionDeleteDialog(transaction: TransactionType) {
  const [open, setOpen] = useState(false);
  const { user } = useUserStore();
  const { toast } = useToast();
  const queryCache = useQueryClient();

  const { isPending, mutateAsync: deleteTransaction } = useMutation({
    mutationFn: () =>
      TransactionService.deleteTransactionById(
        user?.accessToken || "",
        user?.user.id || "",
        transaction.id
      ),
    onSuccess: () => {
      queryCache.invalidateQueries({ queryKey: ["transactions"] });
      toast({
        title: "Successfully deleted transaction.",
        className: "bg-emerald-500 text-white",
      });
      setOpen(false);
    },
    onError: () =>
      toast({
        title: "Failed to delete transaction.",
        className: "bg-red-500 text-white",
      }),
  });

  const handleDeleteTransaction = async () => await deleteTransaction();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2Icon className="p-2 rounded-lg w-10 h-10 bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-300 cursor-pointer hover:bg-red-200 dark:hover:bg-red-950" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete transaction</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this transaction ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            variant="destructive"
            onClick={handleDeleteTransaction}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
