"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronDown, Loader2, WalletIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { TransactionService, UpdateTransactionProps } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useAccountStore, useCategoryStore, useUserStore } from "@/store";
import {
  EditTransactionSchema,
  TransactionType,
  editTransactionSchema,
} from "@/types";
import {
  capitalizeFirstLetter,
  currencyFormatter,
  formatDate,
  types,
} from "@/utils";
import { TransactionDeleteDialog } from "./transaction-delete-dialog";

export function TransactionCard(t: TransactionType) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useUserStore();
  const { accounts } = useAccountStore();
  const { categories } = useCategoryStore();
  const queryCache = useQueryClient();

  const transactionColor = t.type === "EXPENSE" ? "#bf3939" : "#29a358";
  const transactionSymbol = t.type === "INCOME" ? "+ " : "- ";

  const form = useForm<EditTransactionSchema>({
    resolver: zodResolver(editTransactionSchema),
    defaultValues: {
      accountId: t.accountId,
      categoryId: t.categoryId,
      name: t.name,
      amount: t.amount,
      type: t.type,
      date: t.date,
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: UpdateTransactionProps) =>
      TransactionService.updateTransactionById(data),
    onSuccess: () => {
      queryCache.invalidateQueries({ queryKey: ["transactions"] });
      toast({
        title: "Successfully updated transaction.",
        className: "bg-emerald-500 text-white",
      });
      setOpen(false);
    },
    onError: () =>
      toast({
        title: "Failed to update transaction.",
        className: "bg-red-500 text-white",
      }),
  });

  const handleEditTransaction = async (data: EditTransactionSchema) =>
    await mutateAsync({ id: t.id, ...data });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="bg-white dark:bg-zinc-800 rounded-xl flex justify-between items-center px-4 py-4 cursor-pointer">
          <div className="flex items-center gap-4">
            <WalletIcon className="p-1 rounded-full w-8 h-8" />

            <div className="flex flex-col">
              <span className="text-zinc-800 dark:text-white text-md">
                {t.name}
              </span>
              <span className="text-zinc-950 dark:text-zinc-400 font-semibold text-md">
                {formatDate(t.date)}
              </span>
            </div>
          </div>

          <span
            className="text-zinc-950 font-semibold text-md"
            style={{ color: transactionColor }}
          >
            {transactionSymbol}
            {currencyFormatter.format(t.amount / 100)}
          </span>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit transaction</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEditTransaction)}
            className="space-y-8"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Transaction name"
                      className="bg-zinc-100 dark:bg-zinc-900"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount */}
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
                            <div className="flex items-center">
                              <div
                                className="w-3 h-3 mr-2 rounded-full"
                                style={{
                                  background: types.find(
                                    (c) => c === field.value
                                  ),
                                }}
                              />
                              {field.value
                                ? capitalizeFirstLetter(
                                    types.find((c) => c === field.value) || ""
                                  )
                                : "Select type"}
                            </div>
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search type..." />
                          <CommandEmpty>No type found.</CommandEmpty>
                          <CommandGroup>
                            {types.map((c) => (
                              <CommandItem
                                className="cursor-pointer"
                                value={c}
                                key={c}
                                onSelect={() => form.setValue("type", c)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    c === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <div
                                  className="w-3 h-3 mr-2 rounded-full"
                                  style={{
                                    background: c,
                                  }}
                                />
                                {capitalizeFirstLetter(c)}
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
                        <CommandInput placeholder="Search category..." />
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
                            ? accounts.find(
                                (account) => account.id === field.value
                              )?.name
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

            <div className="flex justify-between">
              <Button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-800 text-white"
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>

              <TransactionDeleteDialog {...t} />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
