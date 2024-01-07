import axios from "axios";

import { AccountListType, AccountType } from "@/types/account";

export type CreateAccountProps = {
  name: string;
  amount: number;
};

export type UpdateAccountProps = {
  id: string;
  name: string;
  amount: number;
};

export async function getAccountList(): Promise<AccountListType | null> {
  try {
    const { data } = await axios.get<AccountListType>(
      `http://127.0.0.1:8080/api/accounts`
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function getAccountById(id: string): Promise<AccountType | null> {
  try {
    const { data } = await axios.get<AccountType>(
      `http://127.0.0.1:8080/api/accounts/${id}`
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
      `http://127.0.0.1:8080/api/accounts`,
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
      `http://127.0.0.1:8080/api/accounts/${props.id}`,
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
      `http://127.0.0.1:8080/api/accounts/${id}`
    );
    return data;
  } catch (error) {
    return null;
  }
}
