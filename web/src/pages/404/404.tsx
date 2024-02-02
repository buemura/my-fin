import { useRouterNavigate } from "@/hooks/useRouterNavigate";
import { ROUTES } from "@/router";

export function NotFound() {
  const { router } = useRouterNavigate();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1>Oops! You&apos;ve reached a non explored area...</h1>
      <button
        className="bg-primary text-white p-2 rounded-md"
        onClick={() => router.navigate(ROUTES.ROOT)}
      >
        Go back to Home
      </button>
    </div>
  );
}
