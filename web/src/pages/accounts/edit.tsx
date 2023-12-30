import { useParams } from "@solidjs/router";
import { Show, createResource } from "solid-js";

import { getAccountById } from "@/api/accounts";
import { Sidebar } from "@/components/navigation/side-bar";

export function AccountEdit() {
  const { id } = useParams();
  const [account] = createResource(id, getAccountById);

  return (
    <div class="flex">
      <Sidebar />

      <main class="h-screen w-screen bg-neutral-950 p-10 flex flex-col gap-10">
        <h1 class="text-neutral-100 text-4xl mt-4">Accounts Edit</h1>

        <Show when={account.loading}>
          <h1 class="text-white">Loading...</h1>
        </Show>

        <Show when={!account.loading && (!account() || account.error)}>
          <h1 class="text-white">Account {id} not found</h1>
        </Show>

        <Show when={account()}>
          <form class="flex flex-col gap-4 bg-neutral-900 p-6 rounded-2xl border-2 border-neutral-800">
            <div class="flex flex-col justify-evenly gap-2 sm:flex-row">
              <div class="w-full flex flex-col">
                <label
                  for={`account-${account()?.id}-edit-name`}
                  class="text-neutral-100 text-lg"
                >
                  Name
                </label>
                <input
                  id={`account-${account()?.id}-edit-name`}
                  class="border-2 border-neutral-800 bg-neutral-950 text-neutral-100 rounded-md p-2 outline-none"
                  type="text"
                  value={account()?.name}
                />
              </div>

              <div class="w-full flex flex-col">
                <label
                  for={`account-${account()?.id}-edit-amount`}
                  class="text-neutral-100 text-lg"
                >
                  Amount
                </label>
                <input
                  id={`account-${account()?.id}-edit-amount`}
                  class="border-2 border-neutral-800 bg-neutral-950 text-neutral-100 rounded-md p-2 outline-none"
                  type="number"
                  value={account()?.amount}
                />
              </div>
            </div>

            <button class="bg-blue-600 hover:bg-blue-800 text-neutral-100 rounded-md p-2">
              Submit
            </button>
          </form>
        </Show>
      </main>
    </div>
  );
}
