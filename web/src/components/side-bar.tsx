import Link from "next/link";

export function Sidebar() {
  return (
    <div className="flex flex-col h-screen w-max p-6 bg-neutral-900">
      <h1 className="font-semibold uppercase text-2xl text-neutral-100">
        My Fin
      </h1>

      <div className="flex flex-col mt-10 gap-6">
        {/* App options */}
        <div className="flex flex-col text-neutral-100">
          <Link href="/accounts">Accounts</Link>
          <Link href="/expenses">Expenses</Link>
          <Link href="/transactions">Transactions</Link>
          <Link href="/investiments">Investiments</Link>
        </div>

        {/* User Section */}
        <div className="flex flex-col text-neutral-100">
          <Link href="/settings">Settings</Link>
          <Link href="/">Sign Out</Link>
        </div>
      </div>
    </div>
  );
}
