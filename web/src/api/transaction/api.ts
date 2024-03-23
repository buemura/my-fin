import axios from "axios";

import { getAccessToken } from "@/actions/cookie";
import { env } from "@/env.mjs";
import {
  TransactionListType,
  TransactionType,
  TransactionTypeEnum,
} from "@/types";

const apiUser = env.NEXT_PUBLIC_BACKEND_URL + "/user";
export const TRANSACTION_QUERY_KEY = "transactins";

export type GetTransactoinListProps = {
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

export class TransactionService {
  static async getTransactoinList(
    props: GetTransactoinListProps
  ): Promise<TransactionListType> {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("Missing access_token");
    }

    let url = `${apiUser}/${props.userId}/transactions`;
    if (props.page) {
      url += `?page=${props.page}`;
      if (props.items) {
        url += `&items=${props.items}`;
      }
    }

    const { data } = await axios.get<TransactionListType>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  }

  static async createTransaction(
    props: CreateTransactionProps
  ): Promise<TransactionType> {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("Missing access_token");
    }

    const { data } = await axios.post<TransactionType>(
      `${apiUser}/${props.userId}/transactions`,
      props,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  }

  static async updateTransactionById(
    props: UpdateTransactionProps
  ): Promise<TransactionType> {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("Missing access_token");
    }

    const { data } = await axios.put<TransactionType>(
      `${apiUser}/${props.userId}/transactions/${props.id}`,
      props,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  }

  static async deleteTransactionById(
    userId: string,
    transactionId: string
  ): Promise<TransactionType> {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("Missing access_token");
    }

    const { data } = await axios.delete<TransactionType>(
      `${apiUser}/${userId}/transactions/${transactionId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  }
}
