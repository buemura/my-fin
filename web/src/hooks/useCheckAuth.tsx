import { useQuery } from "@tanstack/react-query";

import { getUser } from "@/api";
import { ROUTES } from "@/router";
import { UserAuthType } from "@/types";
import { useRouterNavigate } from "./useRouterNavigate";

export const useCheckAuth = (user: UserAuthType | null) => {
  const { router } = useRouterNavigate();

  if (!user) {
    router.navigate(ROUTES.SIGNIN);
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () =>
      getUser({
        userId: user?.user.id || "",
        accessToken: user?.accessToken || "",
      }),
  });

  return { data, isLoading, error };
};
