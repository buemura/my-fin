import { PaginationMetadata } from "./pagination-metadata";

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
