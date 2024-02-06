import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { AccountService } from "@/api";
import { useAccountStore, useUserStore } from "@/store";

export const useFetchAccounts = () => {
  const { user } = useUserStore();
  const { setAccounts } = useAccountStore();

  const { data, isSuccess, isLoading, error } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () =>
      AccountService.getAccountList({
        accessToken: user?.accessToken || "",
        userId: user?.user.id || "",
        page: 1,
      }),
  });

  useEffect(() => {
    setAccounts(data?.data.accounts || []);
  }, [isSuccess]);

  return { data };
};
