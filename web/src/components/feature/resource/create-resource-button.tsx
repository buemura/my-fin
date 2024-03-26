"use client";

import { PlusIcon, WalletIcon, ArrowLeftRightIcon } from "lucide-react";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function CreateResourceButton() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="fixed bottom-4 right-4">
          <button className="bg-emerald-800 hover:bg-emerald-900 text-white text-center rounded-full p-4 shadow-lg">
            <PlusIcon />
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href="/account/new" className="flex items-center gap-2">
            <WalletIcon className="w-6 h-6 bg-emerald-100 dark:bg-emerald-950 text-emerald-500 dark:text-emerald-200 rounded-full p-1" />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/transaction/new" className="flex items-center gap-2">
            <ArrowLeftRightIcon className="w-6 h-6 bg-emerald-100 dark:bg-emerald-950 text-emerald-500 dark:text-emerald-200 rounded-full p-1" />
            Transaction
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
