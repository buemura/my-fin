import { create } from "zustand";

import { ICategory } from "@/types";

type CategoryStore = {
  categories: ICategory[];
  setCategories: (categories: ICategory[]) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (categories: ICategory[]) => set(() => ({ categories })),
}));
