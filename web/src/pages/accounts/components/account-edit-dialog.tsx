import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updateAccountById } from "@/api";
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
  Input,
} from "@/components/ui";
import { useRouterNavigate } from "@/hooks";
import { AccountType } from "@/types";
import { useUserStore } from "@/store";

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

  const handleEditAccount = async (data: EditAccountSchema) => {
    await updateAccountById(user?.user.id || "", {
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
