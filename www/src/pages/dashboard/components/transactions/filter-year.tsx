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

interface YearFilterProps {
  title: number;
  setFilter: (value: number) => void;
}

export function YearFilter({ title, setFilter }: YearFilterProps) {
  const handleCheck = (opt: number) =>
    title === opt ? setFilter(new Date().getFullYear()) : setFilter(opt);

  const options: number[] = Array.from({ length: 5 }).map(
    (_, index) => new Date().getFullYear() - index
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-3">
          {title}
          <ChevronDown className="text-zinc-600" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Years</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((opt) => (
          <DropdownMenuCheckboxItem
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
