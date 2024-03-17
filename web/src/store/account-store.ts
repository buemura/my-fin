import { create } from "zustand";

import { AccountType } from "@/types";

type AccountStore = {
  accounts: AccountType[];
  setAccounts: (accounts: AccountType[]) => void;
};

export const useAccountStore = create<AccountStore>((set) => ({
  accounts: [],
  setAccounts: (accounts: AccountType[]) => set(() => ({ accounts })),
}));
