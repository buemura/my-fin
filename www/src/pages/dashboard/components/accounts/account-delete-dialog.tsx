import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2Icon } from "lucide-react";

import { AccountService } from "@/api";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { useUserStore } from "@/store";
import { AccountType } from "@/types";

export function AccountDeleteDialog(account: AccountType) {
  const { invalidateQueries } = useQueryClient();
  const { user } = useUserStore();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: () =>
      AccountService.deleteAccountById(
        user?.accessToken || "",
        user?.user.id || account.userId,
        account.id
      ),
    onSuccess: () => invalidateQueries({ queryKey: ["accounts"] }),
    onError: () => alert("Unable to delete"),
  });

  const handleDeleteAccount = async () => await mutateAsync();

  return (
    <Dialog>
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
