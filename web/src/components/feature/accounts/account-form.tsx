"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  useMutateAccountCreate,
  useMutateAccountUpdate,
} from "@/api/account/mutations";
import { Button } from "@/components/ui/button";
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
import { AccountSchema, AccountType, accountSchema } from "@/types";
import { capitalizeFirstLetter, colors } from "@/utils";
import { useRouter } from "next/navigation";
import { AccountDeleteDialog } from "./account-delete-dialog";

interface AccountFormProps {
  account?: AccountType;
  isEdit: boolean;
}

export function AccountForm({ account, isEdit }: AccountFormProps) {
  const router = useRouter();

  const { mutateAsync: createAccount, isPending: createAccountPending } =
    useMutateAccountCreate();
  const { mutateAsync: updateAccount, isPending: updateAccountPending } =
    useMutateAccountUpdate();

  const form = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: account?.name ?? "",
      balance: account?.balance ?? 1,
      color: account?.color ?? "black",
    },
  });

  const handleSubmit = async (data: AccountSchema) => {
    if (isEdit) {
      return updateAccount({ ...data, id: account?.id ?? "" }).then(() =>
        router.push("/")
      );
    }

    return createAccount(data).then(() => router.push("/"));
  };

  // const handleCreateAccount = async (data: AccountSchema) =>
  //   await mutateAsync(data).then(() => router.push("/"));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
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
                              background: colors.find((c) => c === field.value),
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
                                c === field.value ? "opacity-100" : "opacity-0"
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

        <div className="flex items-center justify-between">
          <Button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white"
          >
            {(createAccountPending || updateAccountPending) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>

          {isEdit && account && <AccountDeleteDialog {...account} />}
        </div>
      </form>
    </Form>
  );
}
