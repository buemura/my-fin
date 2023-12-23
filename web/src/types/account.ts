import { PaginationMetadata } from "./pagination-metadata";

export type AccountType = {
  id: string;
  name: string;
  amount: number;
  updatedAt: Date;
};

export type AccountListType = {
  data: AccountType[];
  metadata: PaginationMetadata;
};
