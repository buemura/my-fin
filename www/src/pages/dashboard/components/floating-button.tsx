import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { PlusIcon, TrendingDown, TrendingUp, Wallet } from "lucide-react";

export function FloatingButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="fixed bottom-4 right-4">
          <button className="bg-emerald-800 hover:bg-emerald-900 text-white text-center rounded-full p-4 shadow-lg">
            <PlusIcon />
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex gap-3 cursor-pointer">
            <TrendingDown className="w-6 h-6 bg-red-100 dark:bg-red-950 text-red-500 dark:text-red-200 rounded-full p-1" />
            <span>Expense</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex gap-3 cursor-pointer">
            <TrendingUp className="w-6 h-6 bg-emerald-100 dark:bg-emerald-950 text-emerald-500 dark:text-emerald-200 rounded-full p-1" />
            <span>Income</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex gap-3 cursor-pointer">
            <Wallet className="w-6 h-6 bg-blue-100 dark:bg-blue-950 text-blue-500 dark:text-blue-200 rounded-full p-1" />
            <span>Bank account</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
