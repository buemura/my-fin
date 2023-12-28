import { getAccountById } from "@/api/accounts";
import { AccountType } from "@/types/account";

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
    <main className="w-screen bg-neutral-950 p-10 flex flex-col gap-10">
      <h1 className="text-neutral-100 text-4xl mt-4">Accounts Edit</h1>

      <form className="flex flex-col gap-4 bg-neutral-800 p-6 rounded-md">
        <div className="flex flex-col justify-evenly gap-2 sm:flex-row">
          <div className="w-full flex flex-col">
            <label
              htmlFor={`account-${account.id}-edit-name`}
              className="text-neutral-100 text-lg"
            >
              Name
            </label>
            <input
              id={`account-${account.id}-edit-name`}
              className="bg-neutral-900 text-neutral-100 rounded-md p-2 outline-none"
              type="text"
              defaultValue={account?.name}
            />
          </div>
          <div className="w-full flex flex-col">
            <label
              htmlFor={`account-${account.id}-edit-amount`}
              className="text-neutral-100 text-lg"
            >
              Amount
            </label>
            <input
              id={`account-${account.id}-edit-amount`}
              className="bg-neutral-900 text-neutral-100 rounded-md p-2 outline-none"
              type="number"
              defaultValue={account?.amount}
            />
          </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-800 text-neutral-100 rounded-md p-2">
          Submit
        </button>
      </form>
    </main>
  );
}
