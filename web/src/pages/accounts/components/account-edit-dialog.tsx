import { useState } from "react";

import { updateAccountById } from "@/api";
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
  Input,
  Label,
} from "@/components/ui";
import { useRouterNavigate } from "@/hooks";
import { AccountType } from "@/types";

export function AccountEditDialog(account: AccountType) {
  const router = useRouterNavigate();

  const [name, setName] = useState(account.name);
  const [amount, setAmount] = useState(account.amount);

  const handleEditAccount = async () => {
    await updateAccountById({
      id: account.id,
      name,
      amount,
    });
    router.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-blue-400 hover:text-blue-400">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit account</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Label htmlFor="account-edit-name">Bank Name</Label>
        <Input
          id="account-edit-name"
          type="text"
          placeholder="Bank Name"
          defaultValue={account.name}
          onChange={(e) => setName(e.target.value)}
        />

        <Label htmlFor="account-edit-amount">Amount</Label>
        <Input
          id="account-edit-amount"
          type="text"
          placeholder="Amount"
          defaultValue={account.amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="default"
            className="bg-blue-500 text-white"
            onClick={handleEditAccount}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
