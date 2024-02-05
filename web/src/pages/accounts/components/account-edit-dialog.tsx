import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { UpdateAccountProps, updateAccountById } from "@/api";
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
import { AccountType } from "@/types";
import { useUserStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const editAccountSchema = z.object({
  name: z.string().min(1, {
    message: "Name cannot be empty",
  }),
  amount: z.coerce.number(),
});

type EditAccountSchema = z.infer<typeof editAccountSchema>;

export function AccountEditDialog(account: AccountType) {
  const { user } = useUserStore();
  const { router } = useRouterNavigate();

  const form = useForm<EditAccountSchema>({
    resolver: zodResolver(editAccountSchema),
    defaultValues: {
      name: account.name,
      amount: account.amount,
    },
  });

  const { isPending, isError, mutate } = useMutation({
    mutationFn: (data: UpdateAccountProps) =>
      updateAccountById(user?.user.id || "", data),
  });

  const handleEditAccount = async (data: EditAccountSchema) => {
    mutate({
      ...data,
      id: account.id,
    });

    if (isError) {
      alert("Unable to update");
    }

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
                    <Input placeholder="Bank name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
