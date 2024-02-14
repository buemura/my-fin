import { useQuery } from "@tanstack/react-query";

import { getUser } from "@/api";
import { useUserStore } from "@/store";

export const useCheckAuth = () => {
  const { user, logoutUser } = useUserStore();

  const userProps = {
    userId: user?.user.id || "",
    accessToken: user?.accessToken || "",
  };

  return useQuery({
    queryKey: ["getUser"],
    queryFn: async () => getUser(userProps).catch(() => logoutUser()),
  });
};
