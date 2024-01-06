"use client";

import { FiMenu } from "react-icons/fi";

import { useSidebarStore } from "@/store/app-store";

export function Header() {
  const { toggleSidebar } = useSidebarStore();

  return (
    <div className="flex items-center gap-3 text-neutral-100 bg-neutral-900 p-2 border-b border-neutral-800">
      <FiMenu
        className="hover:bg-neutral-800 rounded-lg p-1 w-10 h-10 cursor-pointer"
        onClick={() => toggleSidebar()}
      />
      <a href="/dashboard" className="uppercase text-3xl">
        My Fin
      </a>
    </div>
  );
}
