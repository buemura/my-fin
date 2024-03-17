import { z } from "zod";
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

export type TransactionListType = {
  data: TransactionType[];
  metadata: PaginationMetadata;
};

export type ExpensesType = {
  expenses: TransactionType[];
  totalAmount: number;
};

export type ExpenseListType = {
  data: ExpensesType;
  metadata: PaginationMetadata;
};

export const editTransactionSchema = z.object({
  accountId: z.string(),
  categoryId: z.string(),
  name: z.string(),
  amount: z.coerce.number(),
  type: z.nativeEnum(TransactionTypeEnum),
  date: z.date(),
});

export type EditTransactionSchema = z.infer<typeof editTransactionSchema> & {};
