import {
  ArrowLeftRightIcon,
  BanknoteIcon,
  CandlestickChartIcon,
  LogOutIcon,
  SettingsIcon,
  WalletIcon,
} from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  return (
    <div className="flex flex-col items-center h-screen w-max p-1 bg-neutral-900">
      <div className="mt-6">
        <h1 className="font-semibold uppercase text-2xl text-neutral-100">
          My Fin
        </h1>
        <span className="text-neutral-100 text-xs">Hello, Bruno!</span>
      </div>

      <div className="flex flex-col mt-10 gap-6">
        {/* App options */}
        <div className="flex flex-col text-neutral-100">
          <Link
            className="hover:bg-neutral-800 p-1 rounded-sm flex gap-2"
            href="/accounts"
          >
            <WalletIcon className="w-4" />
            <span>Accounts</span>
          </Link>
          <Link
            className="hover:bg-neutral-800 p-1 rounded-sm flex gap-2"
            href="/expenses"
          >
            <BanknoteIcon className="w-4" />
            <span>Expenses</span>
          </Link>
          <Link
            className="hover:bg-neutral-800 p-1 rounded-sm flex gap-2"
            href="/transactions"
          >
            <ArrowLeftRightIcon className="w-4" />
            <span>Transactions</span>
          </Link>
          <Link
            className="hover:bg-neutral-800 p-1 rounded-sm flex gap-2"
            href="/investiments"
          >
            <CandlestickChartIcon className="w-4" />
            <span>Investiments</span>
          </Link>
        </div>

        {/* User Section */}
        <div className="flex flex-col text-neutral-100">
          <Link
            className="hover:bg-neutral-800 p-1 rounded-sm flex gap-2"
            href="/settings"
          >
            <SettingsIcon className="w-4" />
            <span>Settings</span>
          </Link>
          <Link
            className="hover:bg-neutral-800 p-1 rounded-sm flex gap-2"
            href="/"
          >
            <LogOutIcon className="w-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
