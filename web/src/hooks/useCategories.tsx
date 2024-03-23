"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { CategoryService } from "@/api";
import { useCategoryStore } from "@/store";

const CATEGORY_QUERY_KEY = "categories";

export function useCategoryQuery() {
  const { setCategories } = useCategoryStore();

  const query = useQuery({
    queryKey: [CATEGORY_QUERY_KEY],
    queryFn: async () => await CategoryService.getCategoryList(),
  });

  useEffect(() => {
    setCategories(query.data ?? []);
  }, [query.isSuccess]);

  return query;
}
