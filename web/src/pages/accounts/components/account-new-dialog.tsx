import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { PlusCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreateAccountProps, createAccount } from "@/api";
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
import { ROUTES } from "@/router";
import { useUserStore } from "@/store";

const createAccountSchema = z.object({
  name: z.string().min(1, {
    message: "Name cannot be empty",
  }),
  amount: z.coerce.number(),
});

type CreateAccountSchema = z.infer<typeof createAccountSchema>;

export function AccountNewDialog() {
  const { user } = useUserStore();
  const { router } = useRouterNavigate();

  const form = useForm<CreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
  });

  const { isPending, isError, mutate } = useMutation({
    mutationFn: (account: CreateAccountProps) =>
      createAccount(user?.user.id || "", account),
  });

  const handleCreateAccount = async (data: CreateAccountSchema) => {
    mutate(data);

    if (isError) {
      alert("Unable to create");
    }

    router.reload();
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateAccount)}
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
