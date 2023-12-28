import { getAccountById } from "../../api/accounts";

interface AccountProps {
  params: {
    id: string;
  };
}

export default async function Account({ params }: AccountProps) {
  const account = await getAccountById(params.id);

  if (!account) {
    return (
      <main>
        <h1>Account not found</h1>
      </main>
    );
  }

  return (
    <main class="w-screen bg-neutral-950 p-10 flex flex-col gap-10">
      <h1 class="text-neutral-100 text-4xl mt-4">Accounts Edit</h1>

      <form class="flex flex-col gap-4 bg-neutral-800 p-6 rounded-md">
        <div class="flex flex-col justify-evenly gap-2 sm:flex-row">
          <div class="w-full flex flex-col">
            <label
              for={`account-${account.id}-edit-name`}
              class="text-neutral-100 text-lg"
            >
              Name
            </label>
            <input
              id={`account-${account.id}-edit-name`}
              class="bg-neutral-900 text-neutral-100 rounded-md p-2 outline-none"
              type="text"
              value={account?.name}
            />
          </div>
          <div class="w-full flex flex-col">
            <label
              for={`account-${account.id}-edit-amount`}
              class="text-neutral-100 text-lg"
            >
              Amount
            </label>
            <input
              id={`account-${account.id}-edit-amount`}
              class="bg-neutral-900 text-neutral-100 rounded-md p-2 outline-none"
              type="number"
              value={account?.amount}
            />
          </div>
        </div>

        <button class="bg-blue-600 hover:bg-blue-800 text-neutral-100 rounded-md p-2">
          Submit
        </button>
      </form>
    </main>
  );
}
