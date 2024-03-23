"use client";

import { Loader2, Trash2Icon } from "lucide-react";
import { useState } from "react";

import { useMutateAccountDelete } from "@/api/account/mutations";
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
import { AccountType } from "@/types";

export function AccountDeleteDialog(account: AccountType) {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useMutateAccountDelete();

  const handleDeleteAccount = async () =>
    await mutateAsync(account).then(() => setOpen(false));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2Icon className="p-2 rounded-lg w-10 h-10 bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-300 cursor-pointer hover:bg-red-200 dark:hover:bg-red-950" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {account.name} account ?
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
            onClick={handleDeleteAccount}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
