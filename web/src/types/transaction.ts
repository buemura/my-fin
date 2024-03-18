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

export const createTransactionSchema = z.object({
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
  type: z.string(),
  date: z.date(),
});

export type CreateTransactionSchema = z.infer<
  typeof createTransactionSchema
> & {
  type: TransactionTypeEnum;
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
