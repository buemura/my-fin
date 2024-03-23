"use client";

import { Loader2, Trash2Icon } from "lucide-react";
import { useState } from "react";

import { useMutateTransactionDelete } from "@/api/transaction/mutations";
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
import { TransactionType } from "@/types";

export function TransactionDeleteDialog(transaction: TransactionType) {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useMutateTransactionDelete();

  const handleDeleteTransaction = async () =>
    await mutateAsync(transaction).then(() => setOpen(false));

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
