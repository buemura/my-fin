"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronDown, Loader2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

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
import { useMutateTransactionCreate } from "@/hooks";
import { cn } from "@/lib/utils";
import { useAccountStore, useCategoryStore } from "@/store";
import {
  CreateTransactionSchema,
  TransactionTypeEnum,
  createTransactionSchema,
} from "@/types";

interface TransactionNewFormProps {
  defaultType?: TransactionTypeEnum | null | undefined;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function TransactionNewForm({
  defaultType,
  setOpen,
}: TransactionNewFormProps) {
  const { accounts } = useAccountStore();
  const { categories } = useCategoryStore();

  const { mutateAsync, isPending } = useMutateTransactionCreate();

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

  const handleCreateTransaction = async (data: CreateTransactionSchema) =>
    await mutateAsync(data).then(() => setOpen(false));

  const categoryList = categories?.filter(
    (category) => category.type === form.getValues("type")
  );

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
                    className="bg-zinc-100 dark:bg-zinc-900"
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
                    <Button
                      variant="outline"
                      className="bg-zinc-100 dark:bg-zinc-900"
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
                      {field.value && categoryList.length
                        ? categoryList.find(
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
                      {categoryList.length &&
                        categoryList?.map((category) => (
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

        <Button
          type="submit"
          className="bg-emerald-700 hover:bg-emerald-800 text-white"
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
