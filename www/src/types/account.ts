import { PaginationMetadata } from "./pagination-metadata";

export type AccountType = {
  id: string;
  name: string;
  amount: number;
  updatedAt: Date;
};

export type AccountsType = {
  accounts: AccountType[];
  totalAmount: number;
};

export type AccountListType = {
  data: AccountsType;
  metadata: PaginationMetadata;
};
