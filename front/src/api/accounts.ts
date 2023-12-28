import axios from "axios";

import { AccountType } from "../types/account";

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