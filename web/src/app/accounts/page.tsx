import {
  AccountsList,
  AccountsTable,
  MonthDifference,
  TotalAmount,
} from "@/components/feature/accounts";

export default function Accounts() {
  return (
    <div className="w-screen bg-neutral-950 p-10 flex flex-col gap-10">
      <h1 className="text-neutral-100 text-4xl mt-4">Accounts</h1>
      <div className="flex gap-10 mt-10">
        <TotalAmount />
        <MonthDifference />
      </div>

      {/* <AccountsList /> */}
      <AccountsTable />
    </div>
  );
}
