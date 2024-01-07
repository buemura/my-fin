import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getAccountById } from "@/api/accounts";
import { Layout } from "@/components/layout";

export function AccountEdit() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["account", id],
    queryFn: async () => getAccountById(String(id)),
  });

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
      <main className="bg-neutral-950 px-8 flex flex-col gap-10">
        <h1 className="text-neutral-100 text-4xl">Accounts Edit</h1>

        <form className="flex flex-col gap-4 bg-neutral-900 p-6 rounded-2xl border-2 border-neutral-800">
          <div className="flex flex-col justify-evenly gap-2 sm:flex-row">
            <div className="w-full flex flex-col">
              <label
                htmlFor={`account-${data.id}-edit-name`}
                className="text-neutral-100 text-lg"
              >
                Name
              </label>
              <input
                id={`account-${data.id}-edit-name`}
                className="border-2 border-neutral-800 bg-neutral-950 text-neutral-100 rounded-md p-2 outline-none"
                type="text"
                defaultValue={data.name}
              />
            </div>

            <div className="w-full flex flex-col">
              <label
                htmlFor={`account-${data.id}-edit-amount`}
                className="text-neutral-100 text-lg"
              >
                Amount
              </label>
              <input
                id={`account-${data.id}-edit-amount`}
                className="border-2 border-neutral-800 bg-neutral-950 text-neutral-100 rounded-md p-2 outline-none"
                type="number"
                defaultValue={data.amount}
              />
            </div>
          </div>

          <button className="bg-blue-600 hover:bg-blue-800 text-neutral-100 rounded-md p-2">
            Submit
          </button>
        </form>
      </main>
    </Layout>
  );
}
