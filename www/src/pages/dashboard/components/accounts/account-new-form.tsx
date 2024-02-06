import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AccountService, CreateAccountProps } from "@/api";
import {
  Button,
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
import { AccountColor } from "@/types";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/utils";

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

const colors: AccountColor[] = ["black", "purple", "orange", "green"];

export function AccountNewForm() {
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
      AccountService.createAccount(user?.accessToken || "", account),
  });

  const handleCreateAccount = async (data: CreateAccountSchema) => {
    mutate(data);

    if (isError) {
      alert("Unable to create");
    }

    router.reload();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateAccount)}
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
            <FormItem className="flex flex-col">
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="justify-between"
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
