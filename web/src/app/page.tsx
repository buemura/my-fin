import { redirect } from "next/navigation";

import { getAccessToken } from "@/actions/cookie";
import { AccountSection } from "@/components/feature/accounts/account-section";
import { CreateResourceButton } from "@/components/feature/resource/create-resource-button";
import { TransactionSection } from "@/components/feature/transactions/transaction-section";

export default async function Home() {
  const token = await getAccessToken();

  if (!token) {
    return redirect("/signin");
  }

  return (
    <div className="p-4 flex flex-col gap-4 lg:flex-row h-full">
      <AccountSection />
      <TransactionSection />
      <CreateResourceButton />
    </div>
  );
}
