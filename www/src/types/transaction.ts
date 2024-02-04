import { PaginationMetadata } from "./pagination-metadata";

export type TransactionType = {
  id: string;
  accountId: string;
  categoryId: string;
  name: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
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
