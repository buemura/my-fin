import { z } from "zod";
import { PaginationMetadata } from "./metadata";

export type AccountColor = "orange" | "purple" | "green" | "blue" | "black";

export type AccountType = {
  id: string;
  userId: string;
  name: string;
  balance: number;
  color: AccountColor;
  updatedAt: Date;
};

export type AccountsType = {
  accounts: AccountType[];
  totalBalance: number;
};

export type AccountListType = {
  data: AccountsType;
  metadata: PaginationMetadata;
};

export const editAccountSchema = z.object({
  name: z.string(),
  balance: z.coerce.number(),
  color: z.string(),
});

export type EditAccountSchema = z.infer<typeof editAccountSchema> & {
  color: AccountColor;
};
