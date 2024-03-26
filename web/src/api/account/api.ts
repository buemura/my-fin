import axios from "axios";

import { getAccessToken } from "@/actions/cookie";
import { env } from "@/env.mjs";
import { AccountColor, AccountListType, AccountType } from "@/types/account";

const apiUrl = env.NEXT_PUBLIC_BACKEND_URL;
export const ACCOUNT_QUERY_KEY = "accounts";

export type GetAccountProps = {
  accountId: string;
};

export type GetAccountListProps = {
  page?: number;
  items?: number;
};

export type CreateAccountProps = {
  name: string;
  balance: number;
  color: AccountColor;
};

export type UpdateAccountProps = Partial<CreateAccountProps> & {
  id: string;
};

export class AccountService {
  static async getAccount(props: GetAccountProps): Promise<AccountType> {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("Missing access_token");
    }

    const url = `${apiUrl}/accounts/${props.accountId}`;

    const { data } = await axios.get<AccountType>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  }

  static async getAccountList(
    props: GetAccountListProps
  ): Promise<AccountListType> {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("Missing access_token");
    }

    let url = `${apiUrl}/accounts`;
    if (props.page) {
      url += `?page=${props.page}`;
      if (props.items) {
        url += `&items=${props.items}`;
      }
    }

    const { data } = await axios.get<AccountListType>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  }

  static async createAccount(props: CreateAccountProps): Promise<AccountType> {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("Missing access_token");
    }

    const { data } = await axios.post<AccountType>(
      `${apiUrl}/accounts`,
      props,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  }

  static async updateAccountById(
    props: UpdateAccountProps
  ): Promise<AccountType> {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("Missing access_token");
    }

    const { data } = await axios.put<AccountType>(
      `${apiUrl}/accounts/${props.id}`,
      props,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  }

  static async deleteAccountById(
    userId: string,
    accountId: string
  ): Promise<AccountType> {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("Missing access_token");
    }

    const { data } = await axios.delete<AccountType>(
      `${apiUrl}/accounts/${accountId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  }
}
