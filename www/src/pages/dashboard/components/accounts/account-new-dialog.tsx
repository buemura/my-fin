import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, PlusCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AccountService, CreateAccountProps } from "@/api";
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
import { AccountColor } from "@/types";

const createAccountSchema = z.object({
  userId: z.string().uuid(),
  name: z.string().min(1, {
    message: "Name cannot be empty",
  }),
  balance: z.coerce.number(),
  color: z.string(),
});

type CreateAccountSchema = z.infer<typeof createAccountSchema> & {
  color: AccountColor;
};

export function AccountNewDialog() {
  const { user } = useUserStore();
  const { router } = useRouterNavigate();

  const form = useForm<CreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      userId: user?.user.id,
      name: "",
      balance: 1,
      color: "black",
    },
  });

  const { isPending, isError, mutate } = useMutation({
    mutationFn: (account: CreateAccountProps) =>
      AccountService.createAccount(account),
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
          className="h-28 w-full flex gap-2 border border-dashed bg-emerald-800 hover:bg-emerald-900"
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
                    <Input type="text" placeholder="1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
