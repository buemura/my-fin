import { PaginationMetadata } from "./pagination-metadata";

export enum TransactionTypeEnum {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export type TransactionType = {
  id: string;
  accountId: string;
  categoryId: string;
  name: string;
  amount: number;
  type: TransactionTypeEnum;
  date: Date;
};

export type ExpensesType = {
  expenses: TransactionType[];
  totalAmount: number;
};

export type ExpenseListType = {
  data: ExpensesType;
  metadata: PaginationMetadata;
};
