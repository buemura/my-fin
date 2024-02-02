import { BiMoney, BiWallet } from "react-icons/bi";
import { GoArrowSwitch } from "react-icons/go";
import { LuCandlestickChart } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

import { ROUTES } from "@/router";

export function Sidebar() {
  return (
    <div className="flex flex-col gap-6 dark:bg-neutral-900">
      {/* App options */}
      <div className="flex flex-col dark:text-neutral-100">
        <Link
          className="hover:bg-neutral-100 dark:hover:bg-neutral-800 px-2 p-1 rounded-sm flex gap-2 items-center"
          to={ROUTES.ACCOUNTS}
        >
          <BiWallet />
          <span>Accounts</span>
        </Link>
        <Link
          className="hover:bg-neutral-100 dark:hover:bg-neutral-800 px-2 p-1 rounded-sm flex gap-2 items-center"
          to={ROUTES.EXPENSES}
        >
          <BiMoney />
          <span>Expenses</span>
        </Link>
        <Link
          className="hover:bg-neutral-100 dark:hover:bg-neutral-800 px-2 p-1 rounded-sm flex gap-2 items-center"
          to={ROUTES.TRANSACTIONS}
        >
          <GoArrowSwitch />
          <span>Transactions</span>
        </Link>
        <Link
          className="hover:bg-neutral-100 dark:hover:bg-neutral-800 px-2 p-1 rounded-sm flex gap-2 items-center"
          to={ROUTES.INVESTIMENTS}
        >
          <LuCandlestickChart />
          <span>Investiments</span>
        </Link>
      </div>

      {/* User Section */}
      <div className="flex flex-col dark:text-neutral-100">
        {/* <Link
          className="hover:bg-neutral-800 px-2 p-1 rounded-sm flex gap-2 items-center"
          to={ROUTES.SETT}
        >
          <TbSettings />
          <span>Settings</span>
        </Link> */}
        <Link
          className="hover:bg-neutral-100 dark:hover:bg-neutral-800 px-2 p-1 rounded-sm flex gap-2 items-center"
          to={ROUTES.ROOT}
        >
          <MdLogout />
          <span>Sign Out</span>
        </Link>
      </div>
    </div>
  );
}
