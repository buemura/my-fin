import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  CalendarIcon,
  Check,
  ChevronDown,
  ChevronsDown,
  ChevronsUpDown,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import { AccountService, CreateAccountProps } from "@/api";
import {
  Button,
  Calendar,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
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
import { cn } from "@/lib/utils";

const createTransactionSchema = z.object({
  accountId: z.string().uuid({
    message: "Select a valid account",
  }),
  categoryId: z.string().uuid({
    message: "Select a valid category",
  }),
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

const accounts = [
  { id: "67ff1a32-fc8f-449e-b5ac-64d687765dc8", name: "Nubank" },
  { id: "fc4fe91c-219d-459a-9cb2-c7a7b239225b", name: "Inter" },
] as const;

const categories = {
  expense: [
    { id: "c9cfc94f-eb3d-481e-94df-4f56185341e4", name: "House" },
    { id: "88f3a5b1-5f85-4abf-a516-eeb26a14a412", name: "Food" },
    { id: "db781ffa-85ac-404a-bef2-3ff77bc8b6d6", name: "Education" },
  ],
  income: [
    { id: "864c5447-ff6c-43ae-afbc-266f967880bf", name: "Salary" },
    { id: "f38c7886-2aa1-40a9-8015-b1a1393df240", name: "Freelance" },
    { id: "b4d58383-8d0e-4b49-a409-70ec794e3290", name: "Investiment" },
  ],
} as const;

export function TransactionNewForm({ defaultType }: TransactionNewFormProps) {
  const { user } = useUserStore();
  const { router } = useRouterNavigate();

  const form = useForm<CreateTransactionSchema>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      accountId: "",
      categoryId: "",
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

  const getCategory =
    form.getValues("type") === TransactionTypeEnum.EXPENSE
      ? categories.expense
      : categories.income;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateTransaction)}
        className="space-y-4"
      >
        {/* NAME */}
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

        {/* CATEGORY */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="justify-between"
                    >
                      {field.value
                        ? getCategory.find(
                            (category) => category.id === field.value
                          )?.name
                        : "Select category"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search account..." />
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {getCategory.map((category) => (
                        <CommandItem
                          className="cursor-pointer"
                          value={category.name}
                          key={category.id}
                          onSelect={() =>
                            form.setValue("categoryId", category.id)
                          }
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              category.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {category.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ACCOUNT */}
        <FormField
          control={form.control}
          name="accountId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Account</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="justify-between"
                    >
                      {field.value
                        ? accounts.find((account) => account.id === field.value)
                            ?.name
                        : "Select account"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search account..." />
                    <CommandEmpty>No account found.</CommandEmpty>
                    <CommandGroup>
                      {accounts.map((account) => (
                        <CommandItem
                          className="cursor-pointer"
                          value={account.name}
                          key={account.id}
                          onSelect={() =>
                            form.setValue("accountId", account.id)
                          }
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              account.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {account.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
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
