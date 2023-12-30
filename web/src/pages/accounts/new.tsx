import { Sidebar } from "@/components/navigation/side-bar";

export function AccountNew() {
  return (
    <div class="flex">
      <Sidebar />

      <main class="h-screen w-screen bg-neutral-950 p-10 flex flex-col gap-10">
        <h1 class="text-neutral-100 text-4xl mt-4">Accounts New</h1>

        <form class="flex flex-col gap-4 bg-neutral-900 p-6 rounded-2xl border-2 border-neutral-800">
          <div class="flex flex-col justify-evenly gap-2 sm:flex-row">
            <div class="w-full flex flex-col">
              <label for={`account-new-name`} class="text-neutral-100 text-lg">
                Name
              </label>
              <input
                id={`account-new-name`}
                class="border-2 border-neutral-800 bg-neutral-950 text-neutral-100 rounded-md p-2 outline-none"
                type="text"
                placeholder="Bank Name"
              />
            </div>

            <div class="w-full flex flex-col">
              <label
                for={`account-new-amount`}
                class="text-neutral-100 text-lg"
              >
                Amount
              </label>
              <input
                id={`account-new-amount`}
                class="border-2 border-neutral-800 bg-neutral-950 text-neutral-100 rounded-md p-2 outline-none"
                type="number"
                min={1}
                placeholder="1"
              />
            </div>
          </div>

          <button class="bg-blue-600 hover:bg-blue-800 text-neutral-100 rounded-md p-2">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
