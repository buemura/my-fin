import { useMutation } from "@tanstack/react-query";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const createAccountSchema = z.object({
  name: z.string(),
  amount: z.coerce.number(),
});

type CreateAccountSchema = z.infer<typeof createAccountSchema>;

export function AccountNewDialog() {
  const { router } = useRouterNavigate();

  const { register, handleSubmit } = useForm<CreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
  });

  const { isPending, isError, mutate } = useMutation({
    mutationFn: (account: CreateAccountProps) => createAccount(account),
  });

  const handleCreateAccount = async (data: CreateAccountSchema) => {
    mutate(data);

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

        <form
          className="space-y-6"
          onSubmit={handleSubmit(handleCreateAccount)}
        >
          <div>
            <Label htmlFor="account-new-name">Name</Label>
            <Input
              id="account-new-name"
              type="text"
              placeholder="Bank Name"
              {...register("name")}
            />
          </div>

          <div>
            <Label htmlFor="account-new-amount">Amount</Label>
            <Input
              id="account-new-amount"
              type="number"
              min={1}
              placeholder="1"
              {...register("amount")}
            />
          </div>

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
            >
              Confirm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
