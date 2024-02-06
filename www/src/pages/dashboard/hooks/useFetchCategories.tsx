import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { CategoryService } from "@/api";
import { useCategoryStore } from "@/store";

export const useFetchCategories = () => {
  const { setCategories } = useCategoryStore();

  const { data, isSuccess, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => CategoryService.getCategoryList(),
  });

  useEffect(() => {
    setCategories(data || []);
  }, [isSuccess]);

  return { data };
};
