"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { CategoryService } from "@/api";
import { useCategoryStore } from "@/store";

export const useFetchCategories = () => {
  const { setCategories } = useCategoryStore();

  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await CategoryService.getCategoryList(),
  });

  useEffect(() => {
    setCategories(query.data ?? []);
  }, [query.isSuccess]);

  return query;
};
