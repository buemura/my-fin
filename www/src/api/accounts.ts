import axios from "axios";

import { AccountColor, AccountListType, AccountType } from "@/types/account";
import { env } from "@/utils";

export type GetAccountListProps = {
  accessToken: string;
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

const apiUser = env.VITE_BACKEND_URL + "/user";

export class AccountService {
  static async getAccountList(
    props: GetAccountListProps
  ): Promise<AccountListType> {
    let url = `${apiUser}/${props.userId}/accounts`;
    if (props.page) {
      url += `?page=${props.page}`;
      if (props.items) {
        url += `&items=${props.items}`;
      }
    }
    const { data } = await axios.get<AccountListType>(url, {
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    });
    return data;
  }

  static async createAccount(
    accessToken: string,
    props: CreateAccountProps
  ): Promise<AccountType> {
    const { data } = await axios.post<AccountType>(
      `${apiUser}/${props.userId}/accounts`,
      props,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  }

  static async updateAccountById(
    accessToken: string,
    props: UpdateAccountProps
  ): Promise<AccountType> {
    const { data } = await axios.put<AccountType>(
      `${apiUser}/${props.userId}/accounts/${props.id}`,
      props,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  }

  static async deleteAccountById(
    accessToken: string,
    userId: string,
    accountId: string
  ): Promise<AccountType> {
    const { data } = await axios.delete<AccountType>(
      `${apiUser}/${userId}/accounts/${accountId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  }
}
