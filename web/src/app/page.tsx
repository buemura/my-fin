import { redirect } from "next/navigation";

import { getAccessToken } from "@/actions/get-access-token";
import { AccountSection } from "@/components/feature/accounts/account-section";
import { CreateResourceButton } from "@/components/feature/resource/create-resource-button";
import { TransactionSection } from "@/components/feature/transactions/transaction-section";
import { Header } from "./_components/header";

export default async function Home() {
  const token = await getAccessToken();

  if (!token) {
    return redirect("/signin");
  }

  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />

      <div className="p-4 flex flex-col gap-4 lg:flex-row h-full">
        <AccountSection />
        <TransactionSection />

        <CreateResourceButton />
      </div>
    </div>
  );
}
