import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { WalletIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AccountService, UpdateAccountProps } from "@/api";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
  Input,
} from "@/components/ui";
import { useRouterNavigate } from "@/hooks";
import { useUserStore } from "@/store";
import { AccountColor, AccountType } from "@/types";
import { formatBRL, formatDate } from "@/utils";

const editAccountSchema = z.object({
  name: z.string().min(1, {
    message: "Name cannot be empty",
  }),
  balance: z.coerce.number(),
  color: z.string(),
});

type EditAccountSchema = z.infer<typeof editAccountSchema> & {
  color: AccountColor;
};

export function AccountCard(account: AccountType) {
  const { user } = useUserStore();
  const { router } = useRouterNavigate();

  const form = useForm<EditAccountSchema>({
    resolver: zodResolver(editAccountSchema),
    defaultValues: {
      name: account.name,
      balance: account.balance,
      color: account.color,
    },
  });

  const { isPending, isError, mutate } = useMutation({
    mutationFn: (data: UpdateAccountProps) =>
      AccountService.updateAccountById(data),
  });

  const handleEditAccount = async (data: EditAccountSchema) => {
    mutate({
      ...data,
      id: account.id,
      userId: user?.user.id || account.userId,
    });

    if (isError) {
      alert("Unable to update");
    }

    router.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-white rounded-xl flex justify-between items-center px-4 py-4 cursor-pointer">
          <div className="flex items-center gap-4">
            <WalletIcon
              className="p-1 rounded-full w-8 h-8"
              style={{ color: account.color }}
            />

            <div className="flex flex-col">
              <span className="text-zinc-800 text-md">{account.name}</span>
              <span className="text-zinc-950 font-semibold text-md">
                {formatDate(account.updatedAt)}
              </span>
            </div>
          </div>

          <span className="text-zinc-950 font-semibold text-md">
            {formatBRL(account.balance)}
          </span>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit account</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEditAccount)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Bank name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Black" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white"
            >
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
