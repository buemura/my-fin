import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { AccountNewForm } from "./account-new-form";

export function AccountNewDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New account</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <AccountNewForm />
      </DialogContent>
    </Dialog>
  );
}
