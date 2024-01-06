"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createAccount } from "@/api/accounts";

export default function AccountNew() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await createAccount({ name, amount });
    if (!res) {
      alert("Unable to create");
      router.refresh();
    }

    router.push("/accounts");
  };

  return (
    <main className="bg-neutral-950 px-8 flex flex-col gap-10">
      <h1 className="text-neutral-100 text-4xl">Accounts New</h1>

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
        >
          Submit
        </button>
      </form>
    </main>
  );
}
