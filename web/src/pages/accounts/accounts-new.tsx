import { useState } from "react";

import { CreateAccountProps, createAccount } from "@/api/accounts";
import { useRouterNavigate } from "@/hooks";
import { Layout } from "@/components/layout";
import { useMutation } from "@tanstack/react-query";

export function AccountsNew() {
  const { routerNavigate } = useRouterNavigate();

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
      routerNavigate("/accounts/new");
    }
    routerNavigate("/accounts");
  };

  return (
    <Layout>
      <main className="bg-neutral-950 p-8 flex flex-col gap-10">
        <h1 className="text-neutral-100 text-4xl">Accounts / New</h1>

        <form
          className="flex flex-col gap-4 bg-neutral-900 p-6 rounded-2xl border-2 border-neutral-800"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-evenly gap-2 sm:flex-row">
            <div className="w-full flex flex-col">
              <label
                htmlFor={`account-new-name`}
                className="text-neutral-100 text-lg"
              >
                Name
              </label>
              <input
                id={`account-new-name`}
                className="border-2 border-neutral-800 bg-neutral-950 text-neutral-100 rounded-md p-2 outline-none"
                type="text"
                placeholder="Bank Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-full flex flex-col">
              <label
                htmlFor={`account-new-amount`}
                className="text-neutral-100 text-lg"
              >
                Amount
              </label>
              <input
                id={`account-new-amount`}
                className="border-2 border-neutral-800 bg-neutral-950 text-neutral-100 rounded-md p-2 outline-none"
                type="number"
                min={1}
                placeholder="1"
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-800 text-neutral-100 rounded-md p-2"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Submit"}
          </button>
        </form>
      </main>
    </Layout>
  );
}
