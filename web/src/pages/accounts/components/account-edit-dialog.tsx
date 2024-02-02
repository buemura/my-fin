import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const editAccountSchema = z.object({
  name: z.string(),
  amount: z.coerce.number(),
});

type EditAccountSchema = z.infer<typeof editAccountSchema>;

export function AccountEditDialog(account: AccountType) {
  const { router } = useRouterNavigate();

  const { register, handleSubmit } = useForm<EditAccountSchema>({
    resolver: zodResolver(editAccountSchema),
  });

  const handleEditAccount = async (data: EditAccountSchema) => {
    await updateAccountById({
      id: account.id,
      ...data,
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

        <form className="space-y-6" onSubmit={handleSubmit(handleEditAccount)}>
          <div>
            <Label htmlFor="account-edit-name">Bank Name</Label>
            <Input
              id="account-edit-name"
              type="text"
              placeholder="Bank Name"
              defaultValue={account.name}
              {...register("name")}
            />
          </div>

          <div>
            <Label htmlFor="account-edit-amount">Amount</Label>
            <Input
              id="account-edit-amount"
              type="text"
              placeholder="Amount"
              defaultValue={account.amount}
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
