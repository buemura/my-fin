import { z } from "zod";
import { PaginationMetadata } from "./metadata";

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

export const transactionSchema = z.object({
  accountId: z.string().uuid({
    message: "Select a valid account",
  }),
  categoryId: z.string().uuid({
    message: "Select a valid category",
  }),
  name: z.string().min(1, {
    message: "Name cannot be empty",
  }),
  amount: z.coerce.number().min(1, {
    message: "Amount cannot be 0",
  }),
  type: z.nativeEnum(TransactionTypeEnum),
  date: z.date(),
});

export type TransactionSchema = z.infer<typeof transactionSchema>;
