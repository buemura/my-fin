"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { useCategoryStore } from "@/store";
import { CATEGORY_QUERY_KEY, CategoryService } from "./api";

export function useCategoryQuery() {
  const { setCategories } = useCategoryStore();

  const query = useQuery({
    queryKey: [CATEGORY_QUERY_KEY],
    queryFn: async () => await CategoryService.getCategoryList(),
  });

  useEffect(() => {
    setCategories(query.data ?? []);
  }, [query.isSuccess, query.data, setCategories]);

  return query;
}
