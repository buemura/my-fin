import { deleteAccountById } from "@/api";
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
import { useRouterNavigate } from "@/hooks";
import { useUserStore } from "@/store";
import { AccountType } from "@/types";

export function AccountDeleteDialog(account: AccountType) {
  const { user } = useUserStore();
  const { router } = useRouterNavigate();

  const handleDeleteAccount = async () => {
    await deleteAccountById(user?.user.id || "", account.id);
    router.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-red-400 hover:text-red-400">
          Delete
        </Button>
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
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
