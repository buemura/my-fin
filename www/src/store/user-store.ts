import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { UserAuthType } from "@/types";

type UserStore = {
  user: UserAuthType | null;
  setUser: (user: UserAuthType) => void;
  logoutUser: () => void;
};

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user: UserAuthType) => {
          set(() => ({ user: user }));
        },
        logoutUser: () => {
          set(() => ({ user: null }));
        },
      }),
      {
        name: "user-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
