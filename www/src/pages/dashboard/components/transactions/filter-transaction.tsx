import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { ChevronDown } from "lucide-react";

export type TransactionFilterType = "Income" | "Expense" | "Transaction";

const options: TransactionFilterType[] = ["Transaction", "Income", "Expense"];

interface TransactionFilterProps {
  title: string;
  setFilter: (value: TransactionFilterType) => void;
}

export function TransactionFilter({
  title,
  setFilter,
}: TransactionFilterProps) {
  const handleCheck = (opt: TransactionFilterType) =>
    title !== opt ? setFilter(opt) : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-3">
          {title}
          <ChevronDown className="text-zinc-600" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Transaction Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((opt) => (
          <DropdownMenuCheckboxItem
            key={opt}
            className="cursor-pointer"
            checked={title === opt}
            onCheckedChange={() => handleCheck(opt)}
          >
            {opt}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
