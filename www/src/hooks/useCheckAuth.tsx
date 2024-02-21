import { useQuery } from "@tanstack/react-query";

import { UserService } from "@/api";
import { useUserStore } from "@/store";

export const useCheckAuth = () => {
  const { user, logoutUser } = useUserStore();

  const userProps = {
    userId: user?.user.id || "",
    accessToken: user?.accessToken || "",
  };

  return useQuery({
    queryKey: ["getUser"],
    queryFn: async () =>
      UserService.getUser(userProps).catch(() => logoutUser()),
  });
};
