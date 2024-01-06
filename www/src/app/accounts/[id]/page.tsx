import { getAccountById } from "@/api/accounts";

interface AccountEditProps {
  params: {
    id: string;
  };
}

export default async function AccountEdit({ params }: AccountEditProps) {
  const { id } = params;
  const account = await getAccountById(id);

  if (!account) {
    return <h1 className="text-white">Account {id} not found</h1>;
  }

  return (
    <main className="bg-neutral-950 px-8 flex flex-col gap-10">
      <h1 className="text-neutral-100 text-4xl">Accounts Edit</h1>

      {/* <Show when={account.loading}>
        <h1 className="text-white">Loading...</h1>
      </Show> */}

      <form className="flex flex-col gap-4 bg-neutral-900 p-6 rounded-2xl border-2 border-neutral-800">
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
              className="border-2 border-neutral-800 bg-neutral-950 text-neutral-100 rounded-md p-2 outline-none"
              type="text"
              defaultValue={account.name}
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
              className="border-2 border-neutral-800 bg-neutral-950 text-neutral-100 rounded-md p-2 outline-none"
              type="number"
              defaultValue={account.amount}
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
