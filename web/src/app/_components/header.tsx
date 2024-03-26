import { ThemeToggle } from "@/components/theme";
import Link from "next/link";

export function Header() {
  return (
    <div className="flex items-center justify-between gap-3 text-neutral-200 px-4 pt-4">
      <Link
        href="/"
        className="text-3xl text-neutral-950 dark:text-neutral-100"
      >
        MyFin
      </Link>

      <ThemeToggle />
    </div>
  );
}
