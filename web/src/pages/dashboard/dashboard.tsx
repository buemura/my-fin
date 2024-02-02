import { Layout } from "@/components/layout";
import { useCheckAuth, useRouterNavigate } from "@/hooks";
import { ROUTES } from "@/router";
import { useUserStore } from "@/store";

export function Dashboard() {
  const { user } = useUserStore();
  const { data, error } = useCheckAuth(user);
  const { router } = useRouterNavigate();

  if (!error || !data) {
    return router.navigate(ROUTES.SIGNIN);
  }

  return (
    <Layout>
      <main className="dark:bg-neutral-950 p-8 flex flex-col gap-10">
        <h1 className="dark:text-neutral-100 text-4xl">Dashboard</h1>
      </main>
    </Layout>
  );
}
