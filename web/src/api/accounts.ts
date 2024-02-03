import axios from "axios";

import { AccountListType, AccountType } from "@/types/account";
import { env } from "@/utils";

export type GetAccountListProps = {
  userId: string;
  page?: number;
  items?: number;
};

export type CreateAccountProps = {
  name: string;
  amount: number;
};

export type UpdateAccountProps = {
  id: string;
  name: string;
  amount: number;
};

const apiUser = env.VITE_BACKEND_URL + "/user";

export async function getAccountList(
  props: GetAccountListProps
): Promise<AccountListType | null> {
  try {
    let url = `${apiUser}/${props.userId}/accounts`;
    if (props.page) {
      url += `?page=${props.page}`;
      if (props.items) {
        url += `&items=${props.items}`;
      }
    }
    const { data } = await axios.get<AccountListType>(url);
    return data;
  } catch (error) {
    return null;
  }
}

export async function createAccount(
  userId: string,
  body: CreateAccountProps
): Promise<AccountType | null> {
  try {
    const { data } = await axios.post<AccountType>(
      `${apiUser}/${userId}/accounts`,
      body
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function updateAccountById(
  userId: string,
  props: UpdateAccountProps
): Promise<AccountType | null> {
  try {
    const { data } = await axios.put<AccountType>(
      `${apiUser}/${userId}/accounts/${props.id}`,
      {
        name: props.name,
        amount: props.amount,
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function deleteAccountById(
  userId: string,
  accountId: string
): Promise<AccountType | null> {
  try {
    const { data } = await axios.delete<AccountType>(
      `${apiUser}/${userId}/accounts/${accountId}`
    );
    return data;
  } catch (error) {
    return null;
  }
}
