import axios from "axios";

import { AccountColor, AccountListType, AccountType } from "@/types/account";
import { env } from "@/utils";

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

const apiUser = env.VITE_BACKEND_URL + "/user";

export async function getAccountList(
  props: GetAccountListProps
): Promise<AccountListType> {
  let url = `${apiUser}/${props.userId}/accounts`;
  if (props.page) {
    url += `?page=${props.page}`;
    if (props.items) {
      url += `&items=${props.items}`;
    }
  }
  const { data } = await axios.get<AccountListType>(url);
  return data;
}

export async function createAccount(
  props: CreateAccountProps
): Promise<AccountType> {
  const { data } = await axios.post<AccountType>(
    `${apiUser}/${props.userId}/accounts`,
    props
  );
  return data;
}

export async function updateAccountById(
  props: UpdateAccountProps
): Promise<AccountType> {
  const { data } = await axios.put<AccountType>(
    `${apiUser}/${props.userId}/accounts/${props.id}`,
    props
  );
  return data;
}

export async function deleteAccountById(
  userId: string,
  accountId: string
): Promise<AccountType> {
  const { data } = await axios.delete<AccountType>(
    `${apiUser}/${userId}/accounts/${accountId}`
  );
  return data;
}

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
    const { data } = await axios.get<AccountListType>(url);
    return data;
  }

  static async createAccount(props: CreateAccountProps): Promise<AccountType> {
    const { data } = await axios.post<AccountType>(
      `${apiUser}/${props.userId}/accounts`,
      props
    );
    return data;
  }

  static async updateAccountById(
    props: UpdateAccountProps
  ): Promise<AccountType> {
    const { data } = await axios.put<AccountType>(
      `${apiUser}/${props.userId}/accounts/${props.id}`,
      props
    );
    return data;
  }

  static async deleteAccountById(
    userId: string,
    accountId: string
  ): Promise<AccountType> {
    const { data } = await axios.delete<AccountType>(
      `${apiUser}/${userId}/accounts/${accountId}`
    );
    return data;
  }
}
