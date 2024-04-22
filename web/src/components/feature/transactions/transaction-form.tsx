"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  Check,
  CheckIcon,
  ChevronDown,
  ChevronDownIcon,
  Loader2,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";

import {
  useMutateTransactionCreate,
  useMutateTransactionUpdate,
} from "@/api/transaction/mutations";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAccountStore, useCategoryStore } from "@/store";
import {
  TransactionSchema,
  TransactionType,
  TransactionTypeEnum,
  transactionSchema,
} from "@/types";
import { capitalizeFirstLetter, transactionTypes } from "@/utils";
import { useRouter } from "next/navigation";
import { TransactionDeleteDialog } from "./transaction-delete-dialog";

interface TransactionFormProps {
  transaction?: TransactionType;
  isEdit: boolean;
}

export function TransactionForm({ transaction, isEdit }: TransactionFormProps) {
  const router = useRouter();
  const { accounts } = useAccountStore();
  const { categories } = useCategoryStore();
  const {
    mutateAsync: createTransaction,
    isPending: createTransactionPending,
  } = useMutateTransactionCreate();
  const {
    mutateAsync: updateTransaction,
    isPending: updateTransactionPending,
  } = useMutateTransactionUpdate();

  const form = useForm<TransactionSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      accountId: transaction?.accountId ?? "",
      categoryId: transaction?.categoryId ?? "",
      name: transaction?.name ?? "",
      type: transaction?.type ?? TransactionTypeEnum.EXPENSE,
      amount: transaction?.amount ?? 1,
      date: transaction?.date ?? new Date(),
    },
  });

  // form.setValue("type", transaction?.type ?? TransactionTypeEnum.EXPENSE);
  // form.setValue("date", transaction?.date ?? new Date());

  const handleSubmit = async (data: TransactionSchema) => {
    if (isEdit) {
      return updateTransaction({ ...data, id: transaction?.id ?? "" }).then(
        () => router.push("/")
      );
    }

    return createTransaction(data).then(() => router.push("/"));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Transaction title"
                  className="bg-zinc-100 dark:bg-zinc-900"
                  {...field}
                />
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
                <Input
                  type="number"
                  placeholder="1000"
                  className="bg-zinc-100 dark:bg-zinc-900"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="justify-between bg-zinc-100 dark:bg-zinc-900"
                      >
                        <div className="flex items-center gap-2">
                          <TransactionTypeIcon type={field.value} />

                          {field.value
                            ? capitalizeFirstLetter(
                                transactionTypes
                                  .find((c) => c === field.value)
                                  ?.toLowerCase() || ""
                              )
                            : "Select type"}
                        </div>
                        <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search type..." />
                      <CommandEmpty>No type found.</CommandEmpty>
                      <CommandGroup>
                        {transactionTypes.map((tp) => (
                          <CommandItem
                            className="cursor-pointer flex gap-2"
                            value={tp.toLowerCase()}
                            key={tp}
                            onSelect={() => form.setValue("type", tp)}
                          >
                            <CheckIcon
                              className={cn(
                                "h-4 w-4",
                                tp === field.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {capitalizeFirstLetter(tp.toLowerCase())}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DATE */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Transaction date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal bg-zinc-100 dark:bg-zinc-900",
                        !field.value && "text-muted-foreground"
                      )}
                    >
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
                      className="justify-between bg-zinc-100 dark:bg-zinc-900"
                    >
                      {field.value && categories.length
                        ? categories.find(
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
                      {categories.length &&
                        categories?.map((category) => (
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
                      className="justify-between bg-zinc-100 dark:bg-zinc-900"
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

        <div className="flex items-center justify-between">
          <Button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white"
          >
            {(createTransactionPending || updateTransactionPending) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>

          {isEdit && transaction && (
            <TransactionDeleteDialog {...transaction} />
          )}
        </div>
      </form>
    </Form>
  );
}

function TransactionTypeIcon({ type }: { type: TransactionTypeEnum }) {
  const typeMap = {
    [TransactionTypeEnum.EXPENSE]: (
      <TrendingDownIcon className="w-6 h-6 bg-red-100 dark:bg-red-950 text-red-500 dark:text-red-200 rounded-full p-1" />
    ),
    [TransactionTypeEnum.INCOME]: (
      <TrendingUpIcon className="w-6 h-6 bg-emerald-100 dark:bg-emerald-950 text-emerald-500 dark:text-emerald-200 rounded-full p-1" />
    ),
  };

  if (!typeMap[type]) {
    return null;
  }

  return typeMap[type];
}
