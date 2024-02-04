import { useQuery } from "@tanstack/react-query";

import { getUser } from "@/api";
import { UserAuthType } from "@/types";

export const useCheckAuth = (user: UserAuthType | null) => {
  const userProps = {
    userId: user?.user.id || "",
    accessToken: user?.accessToken || "",
  };

  const query = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => getUser(userProps),
  });

  return query;
};
