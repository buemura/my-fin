import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center pt-20">
      <Loader2Icon className="h-20 w-16 animate-spin" />
    </div>
  );
}
