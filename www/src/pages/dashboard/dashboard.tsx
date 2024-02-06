import { CreateResourceButton } from "@/components/feature/create-resource-button";
import { Header } from "@/components/navigation";
import { Accounts } from "./components/accounts";
import { Transactions } from "./components/transactions";

export function Dashboard() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />

      <div className="p-4 flex flex-col gap-4 lg:flex-row h-full">
        <Accounts />
        <Transactions />
      </div>

      <CreateResourceButton />
    </div>
  );
}
