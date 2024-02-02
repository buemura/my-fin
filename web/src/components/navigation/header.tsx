import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

import { ROUTES } from "@/router";
import { useSidebarStore } from "@/store/app-store";
import { ModeToggle } from "../mode-toggle";

export function Header() {
  const { toggleSidebar } = useSidebarStore();

  return (
    <div className="flex items-center gap-3 text-neutral-200 bg-neutral-200 p-2 border-b dark:border-neutral-800 dark:bg-neutral-900">
      <FiMenu
        className="text-neutral-950 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-800 rounded-lg p-1 w-10 h-10 cursor-pointer"
        onClick={() => toggleSidebar()}
      />
      <Link
        to={ROUTES.DASHBOARD}
        className="uppercase text-3xl text-neutral-950 dark:text-neutral-100"
      >
        My Fin
      </Link>

      <ModeToggle />
    </div>
  );
}
