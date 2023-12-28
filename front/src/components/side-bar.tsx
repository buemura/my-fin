import { FaMoneyBill, FaWallet } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { LuCandlestickChart } from "react-icons/lu";
import { MdLogout } from "react-icons/md";

export function Sidebar() {
  return (
    <div class="flex flex-col items-center h-screen w-max p-1 bg-neutral-900">
      <div class="mt-6">
        <h1 class="font-semibold uppercase text-2xl text-neutral-100">
          My Fin
        </h1>
        <span class="text-neutral-100 text-xs">Hello, Bruno!</span>
      </div>

      <div class="flex flex-col mt-10 gap-6">
        {/* App options */}
        <div class="flex flex-col text-neutral-100">
          <a
            class="hover:bg-neutral-800 p-1 rounded-sm flex gap-2"
            href="/accounts"
          >
            <FaWallet class="w-4" />
            <span>Accounts</span>
          </a>
          <a
            class="hover:bg-neutral-800 p-1 rounded-sm flex gap-2"
            href="/expenses"
          >
            <FaMoneyBill class="w-4" />
            <span>Expenses</span>
          </a>
          <a
            class="hover:bg-neutral-800 p-1 rounded-sm flex gap-2"
            href="/transactions"
          >
            <FaArrowRightArrowLeft class="w-4" />
            <span>Transactions</span>
          </a>
          <a
            class="hover:bg-neutral-800 p-1 rounded-sm flex gap-2"
            href="/investiments"
          >
            <LuCandlestickChart class="w-4" />
            <span>Investiments</span>
          </a>
        </div>

        {/* User Section */}
        <div class="flex flex-col text-neutral-100">
          <a
            class="hover:bg-neutral-800 p-1 rounded-sm flex gap-2"
            href="/settings"
          >
            <IoMdSettings class="w-4" />
            <span>Settings</span>
          </a>
          <a class="hover:bg-neutral-800 p-1 rounded-sm flex gap-2" href="/">
            <MdLogout class="w-4" />
            <span>Sign Out</span>
          </a>
        </div>
      </div>
    </div>
  );
}
