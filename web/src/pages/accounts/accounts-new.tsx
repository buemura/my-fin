import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

import { CreateAccountProps, createAccount } from "@/api/accounts";
import { Layout } from "@/components/layout";
import { Button, Input, Label } from "@/components/ui";
import { useRouterNavigate } from "@/hooks";
import { ROUTES } from "@/router";

export function AccountsNew() {
  const router = useRouterNavigate();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1);

  const { isPending, isError, mutate } = useMutation({
    mutationFn: (account: CreateAccountProps) => createAccount(account),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, amount });

    if (isError) {
      alert("Unable to create");
      router.reload();
    }
    router.navigate(ROUTES.ACCOUNTS);
  };

  return (
    <Layout>
      <main className="dark:bg-neutral-950 p-8 flex flex-col gap-10">
        <h1 className="dark:text-neutral-100 text-4xl">
          <Link to={ROUTES.ACCOUNTS} className="text-neutral-500">
            Accounts
          </Link>{" "}
          / New
        </h1>

        <form
          className="flex flex-col gap-4 bg-white dark:bg-neutral-900 p-6 rounded-2xl border-2 dark:border-neutral-800"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-evenly gap-2 sm:flex-row">
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="account-new-name">Name</Label>
              <Input
                id="account-new-name"
                type="text"
                placeholder="Bank Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="account-new-amount">Amount</Label>
              <Input
                id="account-new-amount"
                type="number"
                min={1}
                placeholder="1"
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
          </div>

          <Button
            className="bg-blue-600 hover:bg-blue-800"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Submit"}
          </Button>
        </form>
      </main>
    </Layout>
  );
}
