import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import {
  UpdateAccountProps,
  getAccountById,
  updateAccountById,
} from "@/api/accounts";
import { Layout } from "@/components/layout";
import { useRouterNavigate } from "@/hooks";
import { useEffect, useState } from "react";

export function AccountsEdit() {
  const { id } = useParams();
  const router = useRouterNavigate();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["account", id],
    queryFn: async () => getAccountById(String(id)),
  });

  const { isPending, isError, mutate } = useMutation({
    mutationFn: (props: UpdateAccountProps) => updateAccountById(props),
  });

  useEffect(() => {
    if (data) {
      setName(data.name);
      setAmount(data.amount);
    }
  }, [data]);

  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      id: String(id),
      name,
      amount,
    });

    if (isError) {
      alert("Unable to update");
      router.reload();
    }
    router.navigate("/accounts");
  };

  if (isLoading) {
    return (
      <Layout>
        <h1 className="text-white">Loading...</h1>
      </Layout>
    );
  }

  if (!data || error) {
    return (
      <Layout>
        <h1 className="text-white">Account {id} not found</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="bg-neutral-950 p-8 flex flex-col gap-10">
        <h1 className="text-neutral-100 text-4xl">Accounts / Edit</h1>

        <form
          className="flex flex-col gap-4 bg-neutral-900 p-6 rounded-2xl border-2 border-neutral-800"
          onSubmit={handleUpdateAccount}
        >
          <div className="flex flex-col justify-evenly gap-2 sm:flex-row">
            <div className="w-full flex flex-col">
              <label
                htmlFor={`account-${id}-edit-name`}
                className="text-neutral-100 text-lg"
              >
                Name
              </label>
              <input
                id={`account-${id}-edit-name`}
                className="border-2 border-neutral-800 bg-neutral-950 text-neutral-100 rounded-md p-2 outline-none"
                type="text"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-full flex flex-col">
              <label
                htmlFor={`account-${id}-edit-amount`}
                className="text-neutral-100 text-lg"
              >
                Amount
              </label>
              <input
                id={`account-${id}-edit-amount`}
                className="border-2 border-neutral-800 bg-neutral-950 text-neutral-100 rounded-md p-2 outline-none"
                type="number"
                defaultValue={amount}
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
