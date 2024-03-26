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

export const accountSchema = z.object({
  name: z.string().min(1, {
    message: "Name cannot be empty",
  }),
  balance: z.coerce.number(),
  color: z.string(),
});

export type AccountSchema = z.infer<typeof accountSchema> & {
  color: AccountColor;
};
