import { useMutation } from "@tanstack/react-query";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";

import { CreateAccountProps, createAccount } from "@/api";
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
import { ROUTES } from "@/router";

export function AccountNewDialog() {
  const router = useRouterNavigate();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1);

  const { isPending, isError, mutate } = useMutation({
    mutationFn: (account: CreateAccountProps) => createAccount(account),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, amount });

    if (isError) {
      alert("Unable to create");
      router.reload();
    }
    router.navigate(ROUTES.ACCOUNTS);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="flex gap-2 bg-blue-700 hover:bg-blue-700 dark:text-white"
        >
          <PlusCircleIcon />
          New account
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New account</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Label htmlFor="account-new-name">Name</Label>
        <Input
          id="account-new-name"
          type="text"
          placeholder="Bank Name"
          onChange={(e) => setName(e.target.value)}
        />

        <Label htmlFor="account-new-amount">Amount</Label>
        <Input
          id="account-new-amount"
          type="number"
          min={1}
          placeholder="1"
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
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
