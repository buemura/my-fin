import axios from "axios";

import { TransactionType, TransactionTypeEnum } from "@/types";
import { env } from "@/env.mjs";

export type GetTransactoinListProps = {
  accessToken: string;
  userId: string;
  page?: number;
  items?: number;
};

export type CreateTransactionProps = {
  userId: string;
  accountId: string;
  categoryId: string;
  name: string;
  amount: number;
  type: TransactionTypeEnum;
  date: Date;
};

export type UpdateTransactionProps = Partial<CreateTransactionProps> & {
  id: string;
};

const apiUser = env.NEXT_PUBLIC_BACKEND_URL + "/user";

export class TransactoinService {
  static async getTransactoinList(
    props: GetTransactoinListProps
  ): Promise<TransactionType[]> {
    let url = `${apiUser}/${props.userId}/transactions`;
    if (props.page) {
      url += `?page=${props.page}`;
      if (props.items) {
        url += `&items=${props.items}`;
      }
    }
    const { data } = await axios.get<TransactionType[]>(url, {
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    });
    return data;
  }

  static async createTransaction(
    accessToken: string,
    props: CreateTransactionProps
  ): Promise<TransactionType> {
    const { data } = await axios.post<TransactionType>(
      `${apiUser}/${props.userId}/transactions`,
      props,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  }

  static async updateTransactionById(
    accessToken: string,
    props: UpdateTransactionProps
  ): Promise<TransactionType> {
    const { data } = await axios.put<TransactionType>(
      `${apiUser}/${props.userId}/transactions/${props.id}`,
      props,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  }

  static async deleteTransactionById(
    accessToken: string,
    userId: string,
    transactionId: string
  ): Promise<TransactionType> {
    const { data } = await axios.delete<TransactionType>(
      `${apiUser}/${userId}/transactions/${transactionId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  }
}
