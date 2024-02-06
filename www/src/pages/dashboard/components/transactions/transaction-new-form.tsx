import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AccountService, CreateAccountProps } from "@/api";
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { useRouterNavigate } from "@/hooks";
import { useUserStore } from "@/store";
import { TransactionTypeEnum } from "@/types";
import { format } from "date-fns";

const createTransactionSchema = z.object({
  //   accountId: z.string().uuid(),
  //   categoryId: z.string().uuid(),
  name: z.string().min(1, {
    message: "Name cannot be empty",
  }),
  amount: z.coerce.number().min(1, {
    message: "Amount cannot be 0",
  }),
  type: z.string(),
  date: z.date(),
});

type CreateTransactionSchema = z.infer<typeof createTransactionSchema> & {
  type: TransactionTypeEnum;
};

interface TransactionNewFormProps {
  defaultType?: TransactionTypeEnum | null | undefined;
}

export function TransactionNewForm({ defaultType }: TransactionNewFormProps) {
  const { user } = useUserStore();
  const { router } = useRouterNavigate();

  const form = useForm<CreateTransactionSchema>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      //   accountId: "",
      //   categoryId: "",
      name: "",
      amount: 1,
      type: defaultType ? defaultType : TransactionTypeEnum.EXPENSE,
      date: new Date(),
    },
  });

  //   const { isPending, isError, mutate } = useMutation({
  //     mutationFn: (transaction: CreateTransactionProps) =>
  //       TransactionService.createTransaction(transaction),
  //   });

  const handleCreateTransaction = async (data: CreateTransactionSchema) => {
    console.log(data);

    // mutate(data);

    // if (isError) {
    //   alert("Unable to create");
    // }

    // router.reload();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateTransaction)}
        className="space-y-4"
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

        {/* AMOUNT */}
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

        {/* TYPE */}
        {!defaultType && (
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="EXPENSE"
                    disabled={!!defaultType}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* DATE */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline">
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-emerald-700 hover:bg-emerald-800 text-white"
        >
          {/* {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
          Submit
        </Button>
      </form>
    </Form>
  );
}
