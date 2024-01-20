export const useRouterNavigate = () => {
  const navigate = (route: string) => (location.href = route);
  const reload = () => location.reload();
  return { navigate, reload };
};
