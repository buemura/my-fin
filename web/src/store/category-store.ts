import { create } from "zustand";

import { ICategory } from "@/types";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type CategoryStore = {
  categories: ICategory[];
  setCategories: (categories: ICategory[]) => void;
};

export const useCategoryStore = create<CategoryStore>()(
  devtools(
    persist(
      (set) => ({
        categories: [],
        setCategories: (categories: ICategory[]) => set(() => ({ categories })),
      }),
      {
        name: "category-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
