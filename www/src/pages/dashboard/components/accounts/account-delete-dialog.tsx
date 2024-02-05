import { useMutation } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";

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
  Icons,
} from "@/components/ui";
import { useRouterNavigate } from "@/hooks";
import { useUserStore } from "@/store";
import { AccountType } from "@/types";

export function AccountDeleteDialog(account: AccountType) {
  const { user } = useUserStore();
  const { router } = useRouterNavigate();

  const { isPending, isError, mutate } = useMutation({
    mutationFn: () =>
      AccountService.deleteAccountById(
        user?.user.id || account.userId,
        account.id
      ),
  });

  const handleDeleteAccount = async () => {
    mutate();

    if (isError) {
      alert("Unable to delete");
    }

    router.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2Icon className="p-2 rounded-lg w-10 h-10 text-red-500 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900" />
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
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
