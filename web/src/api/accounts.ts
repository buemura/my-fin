import axios from "axios";

import { AccountListType, AccountType } from "@/types/account";

export async function getAccountList(): Promise<AccountListType | null> {
  try {
    const { data } = await axios.get<AccountListType>(
      `http://localhost:8080/accounts`
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function getAccountById(id: string): Promise<AccountType | null> {
  try {
    const { data } = await axios.get<AccountType>(
      `http://localhost:8080/accounts/${id}`
    );
    return data;
  } catch (error) {
    return null;
  }
}
