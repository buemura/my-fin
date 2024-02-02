export const useRouterNavigate = () => {
  const navigate = (route: string) => (location.href = route);
  const reload = () => location.reload();

  const router = {
    navigate,
    reload,
  };

  return { router };
};
