import { PaginationMetadata } from "./pagination-metadata";

export type AccountType = {
  id: string;
  name: string;
  amount: number;
  updatedAt: Date;
};

export type Accounts = {
  accounts: AccountType[];
  totalAmount: number;
};

export type AccountListType = {
  data: Accounts;
  metadata: PaginationMetadata;
};
