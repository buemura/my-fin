import { create } from "zustand";

import { UserAuthType } from "@/types";

type UserStore = {
  user: UserAuthType | null;
  setUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: () => set((state: UserStore) => ({ ...state })),
}));
