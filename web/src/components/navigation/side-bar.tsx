import { BiWallet } from "react-icons/bi";
import { BiMoney } from "react-icons/bi";
import { GoArrowSwitch } from "react-icons/go";
import { LuCandlestickChart } from "react-icons/lu";
import { TbSettings } from "react-icons/tb";
import { MdLogout } from "react-icons/md";

export function Sidebar() {
  return (
    <div className="flex flex-col gap-6 bg-neutral-900">
      {/* App options */}
      <div className="flex flex-col text-neutral-100">
        <a
          className="hover:bg-neutral-800 px-2 p-1 rounded-sm flex gap-2 items-center"
          href="/accounts"
        >
          <BiWallet />
          <span>Accounts</span>
        </a>
        <a
          className="hover:bg-neutral-800 px-2 p-1 rounded-sm flex gap-2 items-center"
          href="/expenses"
        >
          <BiMoney />
          <span>Expenses</span>
        </a>
        <a
          className="hover:bg-neutral-800 px-2 p-1 rounded-sm flex gap-2 items-center"
          href="/transactions"
        >
          <GoArrowSwitch />
          <span>Transactions</span>
        </a>
        <a
          className="hover:bg-neutral-800 px-2 p-1 rounded-sm flex gap-2 items-center"
          href="/investiments"
        >
          <LuCandlestickChart />
          <span>Investiments</span>
        </a>
      </div>

      {/* User Section */}
      <div className="flex flex-col text-neutral-100">
        <a
          className="hover:bg-neutral-800 px-2 p-1 rounded-sm flex gap-2 items-center"
          href="/settings"
        >
          <TbSettings />
          <span>Settings</span>
        </a>
        <a
          className="hover:bg-neutral-800 px-2 p-1 rounded-sm flex gap-2 items-center"
          href="/"
        >
          <MdLogout />
          <span>Sign Out</span>
        </a>
      </div>
    </div>
  );
}
