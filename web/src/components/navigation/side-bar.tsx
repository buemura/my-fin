import { BiRegularCandles, BiRegularWallet } from "solid-icons/bi";
import {
  FaRegularMoneyBill1,
  FaSolidArrowRightArrowLeft,
} from "solid-icons/fa";
import { FiLogOut, FiSettings } from "solid-icons/fi";

export function Sidebar() {
  return (
    <div class="w-max flex flex-col gap-6 p-1 bg-neutral-900">
      {/* App options */}
      <div class="flex flex-col text-neutral-100 mt-5">
        <a
          class="hover:bg-neutral-800 p-1 rounded-sm flex gap-2 items-center"
          href="/accounts"
        >
          <BiRegularWallet />
          <span>Accounts</span>
        </a>
        <a
          class="hover:bg-neutral-800 p-1 rounded-sm flex gap-2 items-center"
          href="/expenses"
        >
          <FaRegularMoneyBill1 />
          <span>Expenses</span>
        </a>
        <a
          class="hover:bg-neutral-800 p-1 rounded-sm flex gap-2 items-center"
          href="/transactions"
        >
          <FaSolidArrowRightArrowLeft />
          <span>Transactions</span>
        </a>
        <a
          class="hover:bg-neutral-800 p-1 rounded-sm flex gap-2 items-center"
          href="/investiments"
        >
          <BiRegularCandles />
          <span>Investiments</span>
        </a>
      </div>

      {/* User Section */}
      <div class="flex flex-col text-neutral-100">
        <a
          class="hover:bg-neutral-800 p-1 rounded-sm flex gap-2 items-center"
          href="/settings"
        >
          <FiSettings />
          <span>Settings</span>
        </a>
        <a
          class="hover:bg-neutral-800 p-1 rounded-sm flex gap-2 items-center"
          href="/"
        >
          <FiLogOut />
          <span>Sign Out</span>
        </a>
      </div>
    </div>
  );
}
