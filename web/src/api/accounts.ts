import axios from "axios";

import { AccountListType, AccountType } from "@/types/account";

export type CreateAccountProps = {
  name: string;
  amount: number;
};

export async function getAccountList(): Promise<AccountListType | null> {
  try {
    const { data } = await axios.get<AccountListType>(
      `http://localhost:8080/api/accounts`
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function getAccountById(id: string): Promise<AccountType | null> {
  try {
    const { data } = await axios.get<AccountType>(
      `http://localhost:8080/api/accounts/${id}`
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
      `http://localhost:8080/api/accounts`,
      body
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
      `http://localhost:8080/api/accounts/${id}`
    );
    return data;
  } catch (error) {
    return null;
  }
}
