import { useNavigate } from "react-router-dom";

export const useRouterNavigate = () => {
  const navigate = useNavigate();
  const routerNavigate = (route: string) => navigate(route);
  return { routerNavigate };
};
