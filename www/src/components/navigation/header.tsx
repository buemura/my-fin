import { Link } from "react-router-dom";

import { ModeToggle } from "@/components/theme";

export function Header() {
  return (
    <div className="flex items-center justify-between gap-3 text-neutral-200 px-4 pt-4">
      <Link to="/" className="text-3xl text-neutral-950 dark:text-neutral-100">
        MyFin
      </Link>

      <ModeToggle />
    </div>
  );
}
