"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronDown, Loader2, WalletIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AccountService, UpdateAccountProps } from "@/api";
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
import { useUserStore } from "@/store";
import { AccountType, EditAccountSchema, editAccountSchema } from "@/types";
import {
  capitalizeFirstLetter,
  colors,
  currencyFormatter,
  formatDate,
} from "@/utils";
import { AccountDeleteDialog } from "./account-delete-dialog";

export function AccountCard(account: AccountType) {
  const [open, setOpen] = useState(false);
  const { user } = useUserStore();
  const { toast } = useToast();
  const queryCache = useQueryClient();

  const form = useForm<EditAccountSchema>({
    resolver: zodResolver(editAccountSchema),
    defaultValues: {
      name: account.name,
      balance: account.balance,
      color: account.color,
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: UpdateAccountProps) =>
      AccountService.updateAccountById(user?.accessToken || "", data),
    onSuccess: () => {
      queryCache.invalidateQueries({ queryKey: ["accounts"] });
      toast({
        title: "Successfully updated account.",
        className: "bg-emerald-600 text-white",
      });
      setOpen(false);
    },
    onError: () =>
      toast({
        title: "Failed to update account.",
        className: "bg-red-600 text-white",
      }),
  });

  const handleEditAccount = async (data: EditAccountSchema) =>
    await mutateAsync({
      ...data,
      id: account.id,
      userId: user?.user.id || account.userId,
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            {currencyFormatter.format(account.balance)}
          </span>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit account</DialogTitle>
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
                    <Input
                      type="text"
                      placeholder="Bank name"
                      className="bg-zinc-100 dark:bg-zinc-900"
                      {...field}
                    />
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

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Color</FormLabel>
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
                                  background: colors.find(
                                    (c) => c === field.value
                                  ),
                                }}
                              />
                              {field.value
                                ? capitalizeFirstLetter(
                                    colors.find((c) => c === field.value) || ""
                                  )
                                : "Select color"}
                            </div>
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search account..." />
                          <CommandEmpty>No color found.</CommandEmpty>
                          <CommandGroup>
                            {colors.map((c) => (
                              <CommandItem
                                className="cursor-pointer"
                                value={c}
                                key={c}
                                onSelect={() => form.setValue("color", c)}
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

            <div className="flex justify-between">
              <Button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-800 text-white"
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>

              <AccountDeleteDialog {...account} />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
