import { PaginationMetadata } from "./pagination-metadata";

export type AccountType = {
  id: string;
  name: string;
  balance: number;
  color: "orange" | "purple" | "green" | "blue";
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
