import { Loader2 } from "lucide-react";

import { CreateResourceButton } from "@/components/feature/create-resource-button";
import { Header } from "@/components/navigation";
import { useCheckAuth } from "@/hooks";
import { Accounts } from "./components/accounts";
import { Transactions } from "./components/transactions";
import { useFetchCategories } from "./hooks";

export function Dashboard() {
  const { isLoading } = useCheckAuth();
  const _ = useFetchCategories();

  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />

      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader2 className="h-16 w-16 animate-spin text-emerald-500" />
        </div>
      ) : (
        <div className="p-4 flex flex-col gap-4 lg:flex-row h-full">
          <Accounts />
          <Transactions />
          <CreateResourceButton />
        </div>
      )}
    </div>
  );
}
