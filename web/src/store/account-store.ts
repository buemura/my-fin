import { create } from "zustand";

import { AccountType } from "@/types";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type AccountStore = {
  accounts: AccountType[];
  setAccounts: (accounts: AccountType[]) => void;
};

export const useAccountStore = create<AccountStore>()(
  devtools(
    persist(
      (set) => ({
        accounts: [],
        setAccounts: (accounts: AccountType[]) => set(() => ({ accounts })),
      }),
      {
        name: "account-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
