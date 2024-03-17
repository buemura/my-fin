"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateResourceTabs } from "./create-resource-tabs";

export function CreateResourceButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="fixed bottom-4 right-4">
          <button className="bg-emerald-800 hover:bg-emerald-900 text-white text-center rounded-full p-4 shadow-lg">
            <PlusIcon />
          </button>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New resource</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <CreateResourceTabs setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
