import { AccountSection } from "@/components/feature/accounts/account-section";
import { TransactionSection } from "@/components/feature/transactions/transaction-section";
import { Header } from "./_components/header";
import { CreateResourceButton } from "@/components/feature/resource/create-resource-button";

export default function Home() {
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
