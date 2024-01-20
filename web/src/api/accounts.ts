import axios from "axios";

import { AccountListType, AccountType } from "@/types/account";

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

const apiUser = "http://127.0.0.1:8080/api/user";

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

export async function getAccountById(id: string): Promise<AccountType | null> {
  try {
    const { data } = await axios.get<AccountType>(
      `${apiUser}/c3e857a5-f881-4d0e-b85e-7bdb15e6639a/accounts/${id}`
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function createAccount(
  body: CreateAccountProps
): Promise<AccountType | null> {
  try {
    const { data } = await axios.post<AccountType>(
      `${apiUser}/c3e857a5-f881-4d0e-b85e-7bdb15e6639a/accounts`,
      body
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function updateAccountById(
  props: UpdateAccountProps
): Promise<AccountType | null> {
  try {
    const { data } = await axios.put<AccountType>(
      `${apiUser}/c3e857a5-f881-4d0e-b85e-7bdb15e6639a/accounts/${props.id}`,
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
  id: string
): Promise<AccountType | null> {
  try {
    const { data } = await axios.delete<AccountType>(
      `${apiUser}/c3e857a5-f881-4d0e-b85e-7bdb15e6639a/accounts/${id}`
    );
    return data;
  } catch (error) {
    return null;
  }
}
