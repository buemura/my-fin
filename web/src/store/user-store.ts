import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { UserType } from "@/types";

type UserStore = {
  user: UserType | null;
  setUser: (user: UserType) => void;
  logoutUser: () => void;
};

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user: UserType) => set(() => ({ user: user })),
        logoutUser: () => set(() => ({ user: null })),
      }),
      {
        name: "user-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
