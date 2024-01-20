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

const apiUser = "http://127.0.0.1:8080/api/user";

export async function getAccountList(): Promise<AccountListType | null> {
  try {
    const { data } = await axios.get<AccountListType>(
      `${apiUser}/c3e857a5-f881-4d0e-b85e-7bdb15e6639a/accounts`
    );
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
