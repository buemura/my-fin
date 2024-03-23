import axios from "axios";

import { getAccessToken } from "@/actions/cookie";
import { env } from "@/env.mjs";
import { AccountColor, AccountListType, AccountType } from "@/types/account";

const apiUser = env.NEXT_PUBLIC_BACKEND_URL + "/user";
export const ACCOUNT_QUERY_KEY = "accounts";

export type GetAccountListProps = {
  userId: string;
  page?: number;
  items?: number;
};

export type CreateAccountProps = {
  userId: string;
  name: string;
  balance: number;
  color: AccountColor;
};

export type UpdateAccountProps = Partial<CreateAccountProps> & {
  id: string;
  userId: string;
};

export class AccountService {
  static async getAccountList(
    props: GetAccountListProps
  ): Promise<AccountListType> {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("Missing access_token");
    }

    let url = `${apiUser}/${props.userId}/accounts`;
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
      `${apiUser}/${props.userId}/accounts`,
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
      `${apiUser}/${props.userId}/accounts/${props.id}`,
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
      `${apiUser}/${userId}/accounts/${accountId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  }
}
