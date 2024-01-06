import { FiMenu } from "solid-icons/fi";

import { useSidebar } from "@/store/app-store";

export function Header() {
  const { hideSidebar, setHideSidebar } = useSidebar();

  return (
    <div class="flex items-center gap-3 text-neutral-100 bg-neutral-900 p-2 border-b border-neutral-800">
      <FiMenu
        class="hover:bg-neutral-800 rounded-lg p-1 w-10 h-10 cursor-pointer"
        onClick={() => setHideSidebar(!hideSidebar())}
      />
      <a href="/dashboard" class="uppercase text-3xl">
        My Fin
      </a>
    </div>
  );
}
