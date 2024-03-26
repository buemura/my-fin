"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MonthsAbbv } from "@/utils";

interface TransactionMonthFilterProps {
  title: string;
  setFilter: (value: string) => void;
}

export function TransactionMonthFilter({
  title,
  setFilter,
}: TransactionMonthFilterProps) {
  const handleCheck = (opt: string) =>
    title === opt ? setFilter("Months") : setFilter(opt);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-3">
          {title}
          <ChevronDown className="text-zinc-600" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Months</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {MonthsAbbv.map((opt) => (
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
